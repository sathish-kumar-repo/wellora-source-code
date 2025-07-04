import React from "react";
import styles from "./Backdrop.module.css";

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
        className={`${styles.backdrop} ${className || ""}`}
        style={{ zIndex }}
        onClick={onClick}
      ></div>
    );
  }
  return null;
};

export default Backdrop;
