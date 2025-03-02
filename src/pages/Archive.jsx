import React, { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NoteList from "../components/NoteList";
import { deleteNote, getArchivedNotes, unarchiveNote } from "../utils/api";

const Archive = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const { data } = await getArchivedNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching archived notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchivedNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();
    const title = note.title.toLowerCase();
    return title.includes(query);
  });

  const onDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      const { data } = await getArchivedNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const onUnarchiveNote = async (id) => {
    try {
      await unarchiveNote(id);
      const { data } = await getArchivedNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  const onSearchNote = (query) => {
    setSearch(query);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-50">
      <div>
        <Header onSearch={onSearchNote} />
        <div className="mx-auto flex w-[1080px] flex-col gap-4 p-4">
          <NoteList
            title="Catatan Diarsipkan"
            notes={filteredNotes}
            onDelete={onDeleteNote}
            onArchive={onUnarchiveNote}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Archive;
