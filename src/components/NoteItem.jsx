import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router";

import LanguageContext from "../contexts/LanguageContext";

import { showFormattedDate } from "../utils";

import {
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

function NoteItem({ note, onDelete, onArchive }) {
  const { language } = useContext(LanguageContext);
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(note.id);
  };

  const handleArchive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(note.id);
  };

  return (
    <Link
      to={`/note/${note.id}`}
      className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg bg-white p-4 outline outline-slate-200 hover:outline-[#007DFC] dark:bg-slate-800 dark:outline-slate-700"
    >
      <div className="space-y-2 text-sm">
        <h1 className="font-bold">{note.title}</h1>
        <p className="mt-2 font-normal">{note.body}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-normal text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {showFormattedDate(note.createdAt, language)}
        </p>
        <div className="flex">
          <button
            className="cursor-pointer rounded-lg p-2 opacity-0 transition-opacity duration-300 hover:bg-blue-50 group-hover:opacity-100"
            onClick={handleDelete}
          >
            <TrashIcon className="w-4" />
          </button>
          <button
            className="cursor-pointer rounded-lg p-2 opacity-0 transition-opacity duration-300 hover:bg-blue-50 group-hover:opacity-100"
            onClick={handleArchive}
          >
            {note.archived ? (
              <ArchiveBoxXMarkIcon className="w-4" />
            ) : (
              <ArchiveBoxArrowDownIcon className="w-4" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    archived: PropTypes.bool,
    createdAt: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
