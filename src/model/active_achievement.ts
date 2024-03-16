import { kv } from "../data/kv.ts";

export async function getActiveAchievementId(gameId: string) {
  const result = await kv.get<number>([
    "activeAchievementId",
    gameId.toString(),
  ]);

  return result.value;
}

export async function setActiveAchievementId(
  gameId: string,
  achievementId: number,
) {
  await kv.set(["activeAchievementId", gameId.toString()], achievementId);
}
