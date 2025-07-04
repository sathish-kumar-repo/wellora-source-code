import React from "react";

interface SpaceProps {
  sT?: string | number; // Padding top
  sB?: string | number; // Padding bottom
  sX?: string | number; // Padding for both top and bottom
}

const Space: React.FC<SpaceProps> = ({ sT = 0.1, sB = 0.1, sX }) => {
  // Helper function to convert numbers to pixels
  const formatValue = (value: string | number) =>
    typeof value === "number" ? `${value}px` : value;

  return (
    <div
      style={{
        paddingTop: formatValue(sX ?? sT), // Use sX if defined; otherwise, use sT
        paddingBottom: formatValue(sX ?? sB), // Use sX if defined; otherwise, use sB
      }}
    ></div>
  );
};

export default Space;
