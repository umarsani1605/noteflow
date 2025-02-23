import React, { useState } from 'react';
import NoteItem from './NoteItem';
import ChevronDown from '../assets/chevron-down.svg';
import ChevronUp from '../assets/chevron-up.svg';

function NoteList({ title, notes, collapsible = false, onDelete, onArchive, ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-4 w-full">
      <div className={`flex justify-between ${collapsible ? 'cursor-pointer' : ''}`} onClick={toggleCollapse}>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg text-slate-700">{title}</h1>
          <span className="text-sm text-slate-500">({notes.length})</span>
        </div>
        <img src={isCollapsed ? ChevronDown : ChevronUp} alt="toggle" className={`w-4 h-4 ${collapsible ? 'block' : 'hidden'}`} />
      </div>

      <div
        className={`transition-all duration-300
        ${collapsible && isCollapsed ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}
      >
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} {...props} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">{title === 'Diarsipkan' ? 'Tidak ada catatan diarsipkan' : 'Tidak ada catatan'}</p>
        )}
      </div>
    </div>
  );
}

export default NoteList;
