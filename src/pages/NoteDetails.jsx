import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArchiveIcon from "../assets/icons/archive-arrow-down.svg";
import UnarchiveIcon from "../assets/icons/archive-x-mark.svg";
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import TrashIcon from "../assets/icons/trash.svg";
import { showFormattedDate } from "../utils";
import {
  archiveNote,
  deleteNote,
  editNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";

import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const TITLE_CHAR_LIMIT = 50;

  const noteDetail = getNote(id);

  if (!noteDetail) {
    throw new Response("Note tidak ditemukan", { status: 404 });
  }

  const [note, setNote] = useState({
    title: noteDetail.title,
    body: noteDetail.body,
    archived: noteDetail.archived,
    createdAt: noteDetail.createdAt,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > TITLE_CHAR_LIMIT) {
      return;
    }
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editNote({
      id: noteDetail.id,
      title: note.title,
      body: note.body,
      archived: note.archived,
      createdAt: Date.now(),
    });

    navigate(-1);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    deleteNote(id);
    navigate(-1);
  };

  const handleArchiveToggle = () => {
    if (noteDetail.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    navigate(-1);
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col justify-between">
      <Header showSearchBar={false} />
      <div className="w-[1080px] mx-auto p-4 pb-8 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center">
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
              icon={noteDetail.archived ? UnarchiveIcon : ArchiveIcon}
              onClick={handleArchiveToggle}
            >
              {noteDetail.archived ? "Batal Arsipkan" : "Arsipkan"}
            </Button>
          </div>
        </div>
        <form
          className="flex flex-col justify-between rounded-lg bg-white p-8 border border-slate-200 flex-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col h-full pb-2">
            <input
              type="text"
              placeholder="Tulis catatan..."
              name="title"
              className="font-medium text-3xl focus:outline-none w-full border-b border-slate-200 pb-4"
              value={note.title}
              onChange={handleChange}
            />
            <p className="font-normal text-sm text-slate-500 pt-2 pb-6 cursor-default">
              {showFormattedDate(noteDetail.createdAt)}{" "}
              {noteDetail.archived ? " • Pesan dalam arsip" : ""}
            </p>
            <textarea
              id="body"
              placeholder="Tulis catatan..."
              name="body"
              className="font-normal focus:outline-none w-full flex-1"
              value={note.body}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 border-t border-slate-200 pt-4">
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NoteDetails;
