import React from "react";

interface HLProps {
  children?: React.ReactNode;
}
const HL = ({ children }: HLProps) => {
  return (
    <span className="bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 px-1 py-0.5 rounded font-mono text-sm">
      {children}
    </span>
  );
};

export default HL;