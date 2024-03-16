import * as ra from "retroachievements";

import { userName, webApiKey } from "./env.ts";

const authorization = ra.buildAuthorization({ userName, webApiKey });

export async function request(gameId: string) {
  return await ra.getGameInfoAndUserProgress(authorization, {
    userName,
    gameId,
  });
}
