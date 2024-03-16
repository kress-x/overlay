import { hostname, port } from "./data/env.ts";
import { router } from "./router.ts";

export function serve() {
  return Deno.serve({ hostname, port }, router);
}
