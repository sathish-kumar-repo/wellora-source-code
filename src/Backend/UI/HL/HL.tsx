import React from "react";
import "./HL.css";

interface HLProps {
  children?: React.ReactNode;
}
const HL = ({ children }: HLProps) => {
  return <span className="highlight">{children}</span>;
};

export default HL;
