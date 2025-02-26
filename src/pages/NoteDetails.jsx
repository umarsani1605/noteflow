import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';

import { getNote, deleteNote, archiveNote, unarchiveNote, editNote } from '../utils/local-data';
import ArrowLeft from '../assets/arrow-left.svg';
import Pencil from '../assets/pencil.svg';
import Trash from '../assets/trash.svg';
import ArchiveIcon from '../assets/archive-arrow-down.svg';
import UnarchiveIcon from '../assets/archive-x-mark.svg';
import { showFormattedDate } from '../utils';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/Button';

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const TITLE_CHAR_LIMIT = 50;

  const noteDetail = getNote(id);

  const [note, setNote] = useState({
    title: noteDetail.title,
    body: noteDetail.body,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && value.length > TITLE_CHAR_LIMIT) {
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
    });

    navigate('/');
  };

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  const handleArchiveToggle = () => {
    if (noteDetail.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    navigate('/');
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col justify-between">
      <Header showSearchBar={false} />
      <div className="w-[1080px] mx-auto p-4 pb-8 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center px-2">
          <Link to="/" className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 rounded-lg px-4 py-2">
            <img src={ArrowLeft} alt="" className="w-4" />
            <div className="text-slate-700">Kembali</div>
          </Link>
          <div className="flex gap-1">
            <button className="rounded-lg px-4 py-2 text-sm flex items-center gap-1 hover:bg-slate-200" onClick={handleDelete}>
              <img src={Trash} className="w-5" alt="" />
              Hapus
            </button>
            <button className="rounded-lg px-4 py-2 text-sm flex items-center gap-1 hover:bg-slate-200" onClick={handleArchiveToggle}>
              <img src={noteDetail.archived ? UnarchiveIcon : ArchiveIcon} className="w-5" alt="" />
              {noteDetail.archived ? 'Kembalikan' : 'Arsipkan'}
            </button>
          </div>
        </div>
        <form className="flex flex-col justify-between rounded-lg bg-white p-8 border border-slate-200 flex-1" onSubmit={handleSubmit}>
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
              {showFormattedDate(noteDetail.createdAt)} {noteDetail.archived ? ' • Pesan dalam arsip' : ''}
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
