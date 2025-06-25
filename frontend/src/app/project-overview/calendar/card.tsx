import React, { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  event?: any;
}

const Card: React.FC<CardProps> = ({ event }) => {
  return <div>{event.title}</div>;
};

export default Card;
