import React from "react";
import { A } from "..";

interface NoteProps {
  children?: React.ReactNode;
  link?: string;
}

const Note = ({ children, link }: NoteProps) => {
  if (children && link) {
    throw new Error(
      "Note component cannot have both 'children' and 'link' props."
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4">
      <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">Note:</h3>
      <div className="text-blue-700 dark:text-blue-300">
        {link ? (
          <>
            Further details can be found at: <A link={link}>{link}</A>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Note;