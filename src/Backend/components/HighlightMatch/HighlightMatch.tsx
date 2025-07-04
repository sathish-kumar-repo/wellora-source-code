import React from "react";
import styles from "./HighlightMatch.module.css";

interface HighlightMatchProps {
  text: string;
  query: string;
}

// Escape special regex characters
function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const HighlightMatch: React.FC<HighlightMatchProps> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;

  try {
    // Split query by whitespace and filter out empty strings
    const words = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);

    if (words.length === 0) return <>{text}</>;

    // Build a regex that matches any of the words (word1|word2|word3)
    const regex = new RegExp(`(${words.join("|")})`, "gi");

    // Split text by the matched words
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className={styles.highlight}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (error) {
    console.warn("HighlightMatch error:", error);
    return <>{text}</>;
  }
};

export default HighlightMatch;
