import React from "react";
import { A } from "..";

interface ParaProps {
  children?: React.ReactNode;
  link?: string;
  tab?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  align?: "justify" | "left" | "center" | "right";
}

const Para: React.FC<ParaProps> = ({
  children,
  link,
  tab = false,
  bold = false,
  italic = false,
  underline = false,
  strikethrough = false,
  code = false,
  align = "justify",
}) => {
  const classNames = [
    "text-secondary-700 dark:text-secondary-300 text-lg leading-relaxed mb-4",
    tab && "indent-8",
    bold && "font-bold",
    italic && "italic",
    underline && "underline",
    strikethrough && "line-through",
    code && "font-mono bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded",
    align === "justify" && "text-justify",
    align === "center" && "text-center",
    align === "right" && "text-right",
    align === "left" && "text-left",
  ]
    .filter(Boolean)
    .join(" ");

  if (children && link) {
    throw new Error(
      "Para component cannot have both 'children' and 'link' props."
    );
  }
  return (
    <p className={classNames}>
      {link ? (
        <>
          Further details can be found at: <A link={link}>{link}</A>
        </>
      ) : (
        children
      )}
    </p>
  );
};

export default Para;