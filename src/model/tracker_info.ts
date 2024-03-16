import * as ra from "retroachievements";

import { request } from "../data/achievements.ts";

export async function getTrackerInfo(
  gameId: string,
  achievementId?: number,
) {
  const info = await request(gameId);
  const { available, achieved } = split(info.achievements);
  const { obtainedPoints, totalPoints } = getPoints(available, achieved);

  const existingActive = achievementId && info.achievements[achievementId];
  const active = (existingActive && isAvailable(existingActive))
    ? existingActive
    : available[0];

  return {
    title: info.title,
    icon: `${url}/${info.imageIcon}`,
    achievements: `${info.numAwardedToUserHardcore}/${info.numAchievements}`,
    points: `${obtainedPoints}/${totalPoints}`,
    completion: info.userCompletionHardcore,
    prev: formatPrev(achieved[0]),
    next: formatNext(active),
    available: available.map((achievement) => ({
      active: achievement.id === active.id,
      id: achievement.id,
      icon: `${url}/Badge/${achievement.badgeName}.png`,
      name: achievement.title,
      desc: achievement.description,
    })),
  };
}

// internals

type Achievement = ra.GameExtendedAchievementEntityWithUserProgress;

type Achievements = Record<number, Achievement>;

const url = "https://retroachievements.org";

function split(achievements: Achievements) {
  const available: Achievement[] = [];
  const achieved: Achievement[] = [];

  for (const id in achievements) {
    const achievement = achievements[id];

    if (isAvailable(achievement)) {
      available.push(achievement);
    } else {
      achieved.push(achievement);
    }
  }

  achieved.sort((a, b) => getTime(b) - getTime(a));
  available.sort((a, b) => a.displayOrder - b.displayOrder);

  return { achieved, available };
}

function isAvailable(achievement: Achievement) {
  return typeof achievement.dateEarnedHardcore !== "string";
}

function getTime(a: { dateEarnedHardcore: string }) {
  return new Date(a.dateEarnedHardcore).getTime();
}

function getPoints(available: Achievement[], achieved: Achievement[]) {
  const obtainedPoints = achieved.reduce(
    (totalPoints, { points, dateEarnedHardcore }) =>
      dateEarnedHardcore ? totalPoints + points : points,
    0,
  );

  const totalPoints = available.reduce(
    (totalPoints, { points }) => totalPoints + points,
    obtainedPoints,
  );

  return { obtainedPoints, totalPoints };
}

function formatPrev(achievement?: Achievement) {
  if (achievement == null) return;
  return {
    icon: `${url}/Badge/${achievement.badgeName}.png`,
    name: achievement.title,
    date: achievement.dateEarnedHardcore,
  };
}

function formatNext(achievement?: Achievement) {
  if (achievement == null) return;

  return {
    id: achievement.id,
    icon: `${url}/Badge/${achievement.badgeName}.png`,
    name: achievement.title,
    desc: achievement.description,
  };
}
