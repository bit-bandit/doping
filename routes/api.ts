import { HandlerContext } from "$fresh/server.ts";

const file = await Deno.readTextFile("./dump.json");

export function handler(_req: Request, _ctx: HandlerContext): Response {
  const body = file;
  return new Response(body);
}
