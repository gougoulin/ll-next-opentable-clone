import handler from "./seed";
import {NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await handler(req, undefined);
  console.log("seed.js done!");
  return new Response("Hello, seed.js!");
}
