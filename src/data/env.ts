import { load } from "std/dotenv/mod.ts";

await load({ export: true });

export const hostname = Deno.env.get("STREAM_SERVER_HOST") ?? "127.0.0.1";
export const port = +(Deno.env.get("STREAM_SERVER_PORT") ?? "8000");

export const userName = fetch("RA_USER_NAME");
export const webApiKey = fetch("RA_WEB_API_KEY");

function fetch(name: string): string {
  const value = Deno.env.get(name);

  if (value == null || value.trim() == "") {
    throw new Error(`Expected \`${name}\` to be defined.`);
  }

  return value;
}
