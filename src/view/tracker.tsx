import React, { ReactNode } from "react";

export type Props = {
  title: string;
  icon: string;
  achievements: string;
  points: string;
  completion: string;
  next?: {
    icon: string;
    name: string;
    desc: string;
  };
  prev?: {
    icon: string;
    name: string;
    date: string;
  };
};

export function TrackerFrame(props: Props) {
  return (
    <div id="achievements" className="col align-items_center">
      <div className="flex col justify-content_center gap_8px padding_16px">
        <Card title="Playing" img={props.icon}>
          <div className="heading">{props.title}</div>
          <Icon name="bi-trophy">{props.achievements} achievements</Icon>
          <Icon name="bi-coin">{props.points} points</Icon>
          <Icon name="bi-star">{props.completion} completed</Icon>
        </Card>
        <Next next={props.next} />
        <Prev prev={props.prev} />
      </div>
    </div>
  );
}

// internals

type IconProps = {
  name: string;
  children: ReactNode;
};

const Icon = ({ name, children }: IconProps) => (
  <div className="row gap_2px">
    <i className={`size_16px text-align_center bi ${name}`}></i>
    <span>{children}</span>
  </div>
);

const Next = ({ next }: { next: Props["next"] }) =>
  (next != null)
    ? (
      <Card title="Hunting" img={next.icon}>
        <div>{next.name}</div>
        <div>{next.desc}</div>
      </Card>
    )
    : <></>;

type CardProps = {
  title: string;
  img: string;
  children: ReactNode;
};

const Card = ({ title, img, children }: CardProps) => (
  <div className="flex col justify-content_center gap_2px">
    <h1 className="small text-align_center margin-top_neg4px">{title}</h1>
    <div className="row gap_8px">
      <img src={img} width="64px" height="64px" />
      <div className="col justify-content_center">{children}</div>
    </div>
  </div>
);

const Prev = ({ prev }: { prev: Props["prev"] }) =>
  (prev != null)
    ? (
      <Card title="Last Achieved" img={prev.icon}>
        <div>{prev.name}</div>
        <div>{prev.date}</div>
      </Card>
    )
    : <></>;
