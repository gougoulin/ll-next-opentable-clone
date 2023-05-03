import handler from "./seed";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await handler(req, res);
  console.log("seed.js done!")
  return new Response("Hello, seed.js!");
}
