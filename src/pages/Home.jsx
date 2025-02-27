import React, { useState } from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

import {
  addNote,
  archiveNote,
  deleteNote,
  getAllNotes,
  unarchiveNote,
} from "../utils/local-data";

function Home() {
  const [notes, setNotes] = useState(getAllNotes);
  const [search, setSearch] = useState("");

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
          <NoteForm onAddNote={onAddNote} />
          <NoteList
            title="Daftar Catatan"
            notes={activeNotes}
            onDelete={onDeleteNote}
            onArchive={(id) => onArchiveNote(id, false)}
          />
          <Link
            to="archive"
            className="flex items-center gap-2 rounded-lg hover:underline mt-4"
          >
            <span className="font-bold text-lg text-slate-700 ">
              Diarsipkan
            </span>
            <span className="text-sm text-slate-500">
              {archivedNotes.length > 0 && `(${archivedNotes.length})`}
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
