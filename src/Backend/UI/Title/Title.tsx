import React from "react";

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
      {children}
    </div>
  );
};

export default Title;