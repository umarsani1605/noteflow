import { React, useState } from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

import { getInitialData } from './data';

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [search, setSearch] = useState('');

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    const title = note.title.toLowerCase();

    return title.includes(query);
  });

  const activeNotes = filteredNotes.filter((note) => note.archived == false);
  const archivedNotes = filteredNotes.filter((note) => note.archived == true);

  const onAddNote = (note) => {
    setNotes([...notes, note]);
  };

  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const onArchiveNote = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  };

  const onSearchNote = (query) => {
    setSearch(query);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div className="flex flex-col ">
        <div className="bg-white border-b border-slate-200">
          <Header onSearch={onSearchNote} />
        </div>
        <div className="w-[1080px] mx-auto p-4 flex flex-col gap-4">
          <NoteForm onAddNote={onAddNote} />
          <NoteList title="Daftar Catatan" notes={activeNotes} onDelete={onDeleteNote} onArchive={onArchiveNote} />
          <NoteList title="Diarsipkan" notes={archivedNotes} onDelete={onDeleteNote} onArchive={onArchiveNote} collapsible={true} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
