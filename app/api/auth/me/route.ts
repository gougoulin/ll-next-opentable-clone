import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  if (process.env.JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
  if (req.cookies.has("jwt")) {
    const token = req.cookies.get("jwt");
    if (token != undefined && token.value !== "") {
      const decode: any = jwt.verify(token.value, process.env.JWT_SECRET);
      return NextResponse.json({ email: decode?.email, firstName: decode?.firstName });
    }
  }
  return NextResponse.json(null);
}
