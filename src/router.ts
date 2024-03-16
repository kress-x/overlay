import { serveDir } from "std/http/file_server.ts";

import { awayGet } from "./controller/away.ts";
import { endingGet } from "./controller/ending.ts";
import { trackerGet } from "./controller/tracker.ts";
import { ingameGet } from "./controller/ingame.ts";
import { startingGet } from "./controller/starting.ts";
import { indexGet, indexPost } from "./controller/index.ts";

type Controller = (
  url: URL,
  req: Request,
  info: Deno.ServeHandlerInfo,
) => Response | Promise<Response | null | undefined> | null | undefined;

const routes: Controller[] = [
  awayGet,
  endingGet,
  trackerGet,
  ingameGet,
  indexGet,
  indexPost,
  startingGet,
];

export async function router(
  req: Request,
  info: Deno.ServeHandlerInfo,
): Promise<Response> {
  const url = new URL(req.url);

  for (const route of routes) {
    const response = await route(url, req, info);
    if (response) return response;
  }

  return defaultRoute(req);
}

function defaultRoute(req: Request): Promise<Response> {
  return serveDir(req, { fsRoot: "public", urlRoot: "" });
}
