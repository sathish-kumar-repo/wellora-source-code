import React from "react";
import clsx from "clsx";

interface QuoteProps {
  children?: React.ReactNode;
  glass?: boolean;
}

const Quote = ({ children, glass }: QuoteProps) => {
  return (
    <div
      className={clsx(
        "flex gap-3 p-4 mb-6 italic font-medium",
        glass && "bg-white/10 dark:bg-secondary-800/50 backdrop-blur-sm border border-white/20 dark:border-secondary-700/50 rounded-lg"
      )}
    >
      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg flex-shrink-0">
        &gt;&gt;
      </span>
      <span className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
        {children}
      </span>
    </div>
  );
};

export default Quote;