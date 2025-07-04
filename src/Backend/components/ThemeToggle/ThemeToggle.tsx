import React from "react";
import { useTheme } from "../../context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle-${size} ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="theme-toggle-icon">
        {theme === "light" ? (
          <DarkModeIcon fontSize="inherit" />
        ) : (
          <LightModeIcon fontSize="inherit" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;