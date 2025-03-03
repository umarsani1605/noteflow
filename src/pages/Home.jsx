import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import LanguageContext from "../contexts/LanguageContext";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import Loading from "../components/common/Loading";

import { addNote, archiveNote, deleteNote, getActiveNotes } from "../utils/api";

function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { translate } = useContext(LanguageContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await getActiveNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    const title = note.title.toLowerCase();
    return title.includes(query);
  });

  const onAddNote = async (noteData) => {
    try {
      await addNote(noteData);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const onDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const onSearchNote = (query) => {
    setSearch(query);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Header onSearch={onSearchNote} />
        <div className="mx-auto flex w-[1080px] flex-col gap-4 p-4">
          <NoteForm onAddNote={onAddNote} />
          <NoteList
            title={translate("noteList")}
            notes={filteredNotes}
            onDelete={onDeleteNote}
            onArchive={onArchiveNote}
          />
          <Link
            to="archive"
            className="mt-4 flex items-center gap-2 rounded-lg hover:underline"
          >
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {translate("archived")}
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
