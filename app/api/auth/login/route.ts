import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import { findUserByEmail } from "@/app/services/user.service";
import { createToken, verifyPassword } from "@/app/services/auth.service";

const invalid = (msg: string = "Invalid email or password", code: number = 404) => {
  return NextResponse.json(msg, { status: 404 });
};

export async function POST(req: NextRequest) {
  if (req.body == null) return invalid("No body found", 400);
  const reader = req.body.getReader();
  let isDone = false;
  let json = "";
  while (!isDone) {
    const chunk = await reader.read();
    json += new TextDecoder("utf-8").decode(chunk.value);
    isDone = chunk.done;
  }
  const body = JSON.parse(json);
  // find user in database
  const user: User | null = await findUserByEmail(body.email);
  if (user == null) return invalid();
  // check password
  if (!(await verifyPassword(body.password, user.password))) return invalid();
  // create jwt token
  const token = createToken({ id: user.id, email: user.email });
  // return token
  const resp = await NextResponse.json(
    { token, email: user.email },
    {
      status: 200,
    }
  );
  resp.cookies.set({ name: "jwt", value: token, httpOnly: true, maxAge: 3600 });
  console.log({ cookies: resp.cookies });
  return resp;
  // return NextResponse.json({ token, email: user.email }, { status: 200 }).cookies.set(
  //   "jwt",
  //   token,
  //   {
  //     expires: 1,
  //     httpOnly: true,
  //   }
  // );
}
