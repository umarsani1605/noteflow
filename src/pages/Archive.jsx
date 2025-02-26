import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import NoteList from '../components/NoteList';
import { getAllNotes, addNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';

const Archive = () => {
  const [notes, setNotes] = useState(getAllNotes);
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    const title = note.title.toLowerCase();

    return title.includes(query);
  });

  const activeNotes = filteredNotes.filter((note) => note.archived === false);
  const archivedNotes = filteredNotes.filter((note) => note.archived === true);

  const onAddNote = (noteData) => {
    addNote({ title: noteData.title, body: noteData.body });
    setNotes(getAllNotes());
  };

  const onDeleteNote = (id) => {
    deleteNote(id);
    setNotes(getAllNotes());
  };

  const onArchiveNote = (id, isArchived) => {
    if (isArchived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    setNotes(getAllNotes());
  };

  const onSearchNote = (query) => {
    setSearch(query);
  };
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Header onSearch={onSearchNote} />
        <div className="w-[1080px] mx-auto p-4 flex flex-col gap-4">
          <NoteList title="Catatan Diarsipkan" notes={archivedNotes} onDelete={onDeleteNote} onArchive={(id) => onArchiveNote(id, true)} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Archive;
