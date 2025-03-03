import PropTypes from "prop-types";
import React, { useState, useContext } from "react";

import LanguageContext from "../contexts/LanguageContext";

import ChevronDown from "../assets/icons/chevron-down.svg";
import ChevronUp from "../assets/icons/chevron-up.svg";
import NoteItem from "./NoteItem";

function NoteList({
  title,
  notes,
  collapsible = false,
  onDelete,
  onArchive,
  ...props
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { translate } = useContext(LanguageContext);

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div
        className={`flex justify-between ${
          collapsible ? "cursor-pointer" : ""
        }`}
        onClick={toggleCollapse}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-700 dark:text-slate-200">
            {title}
          </h1>
          <span className="text-sm text-slate-500 dark:text-slate-300">
            ({notes.length})
          </span>
        </div>
        <img
          src={isCollapsed ? ChevronDown : ChevronUp}
          alt="toggle"
          className={`h-4 w-4 ${collapsible ? "block" : "hidden"}`}
        />
      </div>

      <div
        className={`transition-all duration-300 ${
          collapsible && isCollapsed
            ? "h-0 overflow-hidden opacity-0"
            : "h-auto opacity-100"
        }`}
      >
        {notes.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                {...props}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            {title === "Diarsipkan"
              ? translate("noArchivedNotes")
              : translate("noNotes")}
          </p>
        )}
      </div>
    </div>
  );
}

NoteList.propTypes = {
  title: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  collapsible: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
