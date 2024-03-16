import { renderToReadableStream } from "react-dom-server";

import { okay } from "./_responses.ts";
import { IngamePage } from "../view/ingame.tsx";

export async function ingameGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/ingame") return;

  return new Response(
    await renderToReadableStream(IngamePage()),
    okay,
  );
}
