import { kv } from "../data/kv.ts";

export async function getActiveGameId() {
  const result = await kv.get<string>(["activeGameId"]);
  return result.value;
}

export async function setActiveGameId(gameId: string) {
  await kv.set(["activeGameId"], gameId);
}
