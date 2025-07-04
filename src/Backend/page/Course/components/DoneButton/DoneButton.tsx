import React from "react";
import "./DoneButton.css";

interface DoneProps {
  onClick: () => void;
}

const DoneButton: React.FC<DoneProps> = ({ onClick }) => {
  return (
    <div className="done-btn" onClick={onClick}>
      Done
    </div>
  );
};

export default DoneButton;
