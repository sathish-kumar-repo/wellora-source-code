import React from "react";

interface BackdropProps {
  onClick?: () => void;
  enable?: boolean;
  zIndex?: number;
  className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({
  onClick,
  enable = false,
  zIndex = 999,
  className,
}) => {
  if (enable) {
    return (
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${className || ""}`}
        style={{ zIndex }}
        onClick={onClick}
      ></div>
    );
  }
  return null;
};

export default Backdrop;