import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json("");
  res.cookies.set({ name: "jwt", value: "", httpOnly: true, path: "/", maxAge: -1 });
  return res;
}
