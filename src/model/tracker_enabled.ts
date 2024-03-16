import { kv } from "../data/kv.ts";

export async function getTrackerEnabled() {
  const { value } = await kv.get<boolean>(["trackerStatus"]);
  return value;
}

export async function setTrackerEnabled(enabled: boolean) {
  await kv.set(["trackerStatus"], enabled);
}
