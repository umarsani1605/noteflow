import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { showFormattedDate } from '../utils';

import Trash from '../assets/icons/trash.svg';
import ArchiveIcon from '../assets/icons/archive-arrow-down.svg';
import UnarchiveIcon from '../assets/icons/archive-x-mark.svg';

function NoteItem({ note, onDelete, onArchive }) {
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
      className="group flex flex-col justify-between cursor-pointer bg-white p-4 rounded-lg hover:outline-[#007DFC] outline outline-slate-200 overflow-hidden"
    >
      <div className="space-y-2 text-sm text-slate-700">
        <h1 className="font-bold">{note.title}</h1>
        <p className="font-normal mt-2">{note.body}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="font-normal text-xs text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {showFormattedDate(note.createdAt)}
        </p>
        <div className="flex">
          <button
            className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-lg p-2 hover:bg-blue-50 cursor-pointer"
            onClick={handleDelete}
          >
            <img src={Trash} alt="delete-icon" className="w-4" />
          </button>
          <button
            className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-lg p-2 hover:bg-blue-50 cursor-pointer"
            onClick={handleArchive}
          >
            <img src={note.archived ? UnarchiveIcon : ArchiveIcon} alt="archive-icon" className="w-4" />
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
