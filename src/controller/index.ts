import { renderToReadableStream } from "react-dom-server";

import {
  getActiveAchievementId,
  setActiveAchievementId,
} from "../model/active_achievement.ts";
import { getActiveGameId } from "../model/active_game.ts";
import { getTrackerEnabled } from "../model/tracker_enabled.ts";
import { getTrackerInfo } from "../model/tracker_info.ts";
import { okay } from "./_responses.ts";
import { setActiveGameId } from "../model/active_game.ts";
import { setTrackerEnabled } from "../model/tracker_enabled.ts";
import { IndexPage } from "../view/index.tsx";

export async function indexGet(url: URL, req: Request) {
  if (req.method !== "GET") return;
  if (url.pathname !== "/") return;

  const props = await getProps();

  if (props == null) return new Response("", okay);

  return new Response(
    await renderToReadableStream(IndexPage(props)),
    okay,
  );
}

export async function indexPost(url: URL, req: Request) {
  if (req.method !== "POST") return;
  if (url.pathname !== "/") return;

  const formData = await req.formData();

  await setTrackerEnabled(formData.has("enabled"));

  const gameIdInt = asInt(formData.get("gameId"));
  if (isNaN(gameIdInt)) return;

  const gameId = gameIdInt.toString();
  await setActiveGameId(gameId);

  const achievementId = asInt(formData.get("achievementId"));
  if (isNaN(achievementId)) return;

  if (achievementId) await setActiveAchievementId(gameId, achievementId);

  const props = await getProps();

  if (props == null) return new Response("", okay);

  return new Response(
    await renderToReadableStream(IndexPage(props)),
    okay,
  );
}

// internals

async function getProps() {
  const enabled = (await getTrackerEnabled()) ?? false;
  const gameId = await getActiveGameId();
  const info = gameId ? await getInfo(gameId) : undefined;

  return {
    gameId: gameId,
    enabled,
    info,
  };
}

async function getInfo(gameId: string) {
  const achievementId = await getActiveAchievementId(gameId);
  const info = await getTrackerInfo(gameId, achievementId ?? undefined);
  const nextAchievementId = info?.next?.id;

  if (nextAchievementId && nextAchievementId !== achievementId) {
    await setActiveAchievementId(gameId, nextAchievementId);
  }

  return info;
}

function asInt(value: FormDataEntryValue | null): number {
  return Number.parseInt(value?.toString() ?? "");
}
