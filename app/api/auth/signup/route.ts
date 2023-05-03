import { NextResponse } from "next/server";
import Joi from "joi";
import { createUser, findUserByEmail } from "@/app/services/user.service";
import { createToken, hashPassword } from "@/app/services/auth.service";

export async function POST(req: Request) {
  // make sure JWT_SECRET is set
  if (typeof process.env.JWT_SECRET !== "string") throw new Error("JWT_SECRET is not defined");
  // ...
  const body = await req.json();
  // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  const schema: Joi.ObjectSchema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    phone: Joi.number().min(6),
    city: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(/^[0-9a-zA-Z]{3,}$/),
    repeatPassword: Joi.ref("password"),
  });
  /**
   * 0. validate body
   */
  let result;
  try {
    result = await schema.validateAsync(body);
  } catch (err) {
    return NextResponse.json((err as any).details);
  }
  /**
   * 1. find user by email
   */
  const user = await findUserByEmail(result.email);
  /**
   * 2. if user exists return error
   */
  if (user != null) return NextResponse.json({ message: "User already exists" });
  /**
   * 3. create user if not exists
   */
  const data: any = {
    email: result.email,
    password: await hashPassword(result.password),
  };
  result?.firstName && (data.firstName = result.firstName);
  result?.lastName && (data.lastName = result.lastName);
  result?.city && (data.city = result.city);
  result?.phone && (data.phone = result.phone);

  const newUser = await createUser(data);
  /**
   * 4. create jwt token
   */
  if (!newUser) return NextResponse.json({ message: "User not created" });
  const token = createToken({
    id: newUser?.id,
    email: newUser?.email,
  });
  return NextResponse.json(token, { status: 201 });
}
