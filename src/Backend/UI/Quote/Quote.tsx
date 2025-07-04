import React from "react";
import styles from "./Quote.module.scss";
import clsx from "clsx";

interface QuoteProps {
  children?: React.ReactNode;
  glass?: boolean;
}

const Quote = ({ children, glass }: QuoteProps) => {
  return (
    <div
      className={clsx(styles.quotesContainer, {
        [styles.glass]: glass || false,
      })}
    >
      <span className={styles.arrow}>{`>>`}</span>
      <span className={styles.quote}>{children}</span>
    </div>
  );
};

export default Quote;
