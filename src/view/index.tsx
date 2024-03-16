import React from "react";

import { Layout } from "./_layout.tsx";

export type Props = {
  enabled: boolean;
  gameId?: string | null;
  info?: {
    title: string;
    icon: string;
    achievements: string;
    points: string;
    completion: string;
    next?: {
      id: number;
      icon: string;
      name: string;
      desc: string;
    };
    prev?: {
      icon: string;
      name: string;
      date: string;
    };
    available: {
      id: number;
      icon: string;
      name: string;
      desc: string;
    }[];
  } | null;
};

export function IndexPage(props: Props) {
  return (
    <Layout title="Selector" shrink>
      <div id="index">
        <div className="flex col justify-content_center gap_8px padding_16px">
          <form
            name="tracker"
            action="/"
            method="POST"
            className="col gap_8px"
          >
            <TrackerIf info={props.info} />

            <div className="row gap_8px">
              <label htmlFor="enabled">Enabled</label>
              <input
                name="enabled"
                type="checkbox"
                checked={props.enabled}
              />
            </div>

            <div className="row gap_8px">
              <label htmlFor="gameId">Game ID</label>
              <input
                name="gameId"
                type="number"
                value={props.gameId ?? 559}
              />
            </div>

            <input
              name="achievementId"
              type="number"
              value={props.info?.next?.id}
              hidden
            />

            {props.info?.available.map(
              (next) => (
                <Next activeId={props.info?.next?.id} achievement={next} />
              ),
            )}

            <input
              type="submit"
              value={props.info?.next?.id ?? 559}
              hidden
            />
          </form>
        </div>
      </div>
      <script src="index.js"></script>
    </Layout>
  );
}

// internals

type TrackerIfProps = {
  info?: Props["info"];
};

const TrackerIf = ({ info }: TrackerIfProps) =>
  info
    ? (
      <div className="row gap_8px">
        <img src={info.icon} width="64px" height="64px" />
        <div className="col justify-content_center">
          <div className="title">{info.title}</div>
        </div>
      </div>
    )
    : <></>;

type NextProps = {
  activeId?: number;
  achievement: Exclude<Props["info"], null | undefined>["available"][number];
};

const Next = ({ activeId, achievement }: NextProps) => (
  <div
    className="row gap_8px"
    data-id={achievement.id}
    data-card
    data-checked={activeId === achievement.id ? "" : undefined}
  >
    <img src={achievement.icon} width="64px" height="64px" />
    <div className="col justify-content_center">
      <div>{achievement.name}</div>
      <div>{achievement.desc}</div>
    </div>
  </div>
);
