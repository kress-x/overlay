import { renderToReadableStream } from "react-dom-server";

import { okay } from "./_responses.ts";
import { EndingPage } from "../view/ending.tsx";

export async function endingGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/ending") return;

  return new Response(
    await renderToReadableStream(EndingPage()),
    okay,
  );
}
