import { renderToReadableStream } from "react-dom-server";

import { okay } from "./_responses.ts";
import { StartingPage } from "../view/starting.tsx";

export async function startingGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/starting") return;

  return new Response(
    await renderToReadableStream(StartingPage()),
    okay,
  );
}
