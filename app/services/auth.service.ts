import * as jwt from "jsonwebtoken";
import * as argon2 from "argon2";

export const createToken = (data: any) => {
  if (typeof process.env.JWT_SECRET !== "string") throw new Error("JWT_SECRET is not defined");
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const hashPassword = async (password: string) => {
  return argon2.hash(password);
};

export const verifyPassword = async (password: string, hash: string) => {
  return argon2.verify(hash, password);
};
