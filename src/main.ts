import { serve } from "./serve.ts";

const server = serve();

await server.finished;
