import React from "react";
import "./Note.css";
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
    <div className="note-container">
      <h3>Note:</h3>
      <div className="notes">
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
