import { renderToReadableStream } from "react-dom-server";

import { okay } from "./_responses.ts";
import { getTrackerInfo } from "../model/tracker_info.ts";
import { TrackerFrame } from "../view/tracker.tsx";
import { getActiveGameId } from "../model/active_game.ts";
import {
  getActiveAchievementId,
  setActiveAchievementId,
} from "../model/active_achievement.ts";
import { getTrackerEnabled } from "../model/tracker_enabled.ts";

export async function trackerGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/tracker") return;

  const props = await getProps();

  if (props == null) return new Response("", okay);

  return new Response(
    await renderToReadableStream(TrackerFrame(props)),
    okay,
  );
}

// internals

async function getProps() {
  const enabled = await getTrackerEnabled();
  if (!enabled) return;

  const gameId = await getActiveGameId();
  if (gameId == null) return;

  const achievementId = await getActiveAchievementId(gameId);
  const info = await getTrackerInfo(gameId, achievementId ?? undefined);
  const nextAchievementId = info?.next?.id;

  if (nextAchievementId && nextAchievementId !== achievementId) {
    await setActiveAchievementId(gameId, nextAchievementId);
  }

  const { available: _, ...props } = info;

  return props;
}
