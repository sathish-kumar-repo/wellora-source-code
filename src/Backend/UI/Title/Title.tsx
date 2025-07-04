import React from "react";
import "./Title.css";

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <div className="glass-text ">{children}</div>;
};
``;
export default Title;
