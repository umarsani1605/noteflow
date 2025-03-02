import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import ArchiveIcon from "../assets/icons/archive-arrow-down.svg";
import UnarchiveIcon from "../assets/icons/archive-x-mark.svg";
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import TrashIcon from "../assets/icons/trash.svg";
import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";

import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(id);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
        navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleArchiveToggle = async () => {
    try {
      if (note.archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error toggling archive:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col justify-between bg-slate-50">
      <Header showSearchBar={false} />
      <div className="mx-auto flex w-[1080px] flex-1 flex-col gap-2 p-4 pb-8">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            icon={ArrowLeftIcon}
            onClick={handleBackButton}
          >
            Kembali
          </Button>
          <div className="flex gap-1">
            <Button variant="secondary" icon={TrashIcon} onClick={handleDelete}>
              Hapus
            </Button>
            <Button
              variant="secondary"
              icon={note.archived ? UnarchiveIcon : ArchiveIcon}
              onClick={handleArchiveToggle}
            >
              {note.archived ? "Batal Arsipkan" : "Arsipkan"}
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-lg border border-slate-200 bg-white p-8">
          <div className="flex h-full flex-col pb-2">
            <h1 className="border-b border-slate-200 pb-4 text-3xl font-medium">
              {note.title}
            </h1>
            <p className="cursor-default pb-6 pt-2 text-sm font-normal text-slate-500">
              {showFormattedDate(note.createdAt)}{" "}
              {note.archived ? " • Pesan dalam arsip" : ""}
            </p>
            <p className="font-normal">{note.body}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoteDetails;
