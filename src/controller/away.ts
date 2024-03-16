import { renderToReadableStream } from "react-dom-server";

import { okay } from "./_responses.ts";
import { AwayPage } from "../view/away.tsx";

export async function awayGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/away") return;

  return new Response(
    await renderToReadableStream(AwayPage()),
    okay,
  );
}
