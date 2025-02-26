import React, { useState } from 'react';
import Button from './Button';
import PencilIcon from '../assets/pencil-subtle.svg';
import CloseIcon from '../assets/close.svg';

function NoteForm({ onAddNote, ...props }) {
  const TITLE_CHAR_LIMIT = 50;

  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    body: '',
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

  const remainingTitleChars = TITLE_CHAR_LIMIT - note.title.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddNote({
      id: +new Date(),
      title: note.title,
      body: note.body,
      archived: false,
      createdAt: new Date().toISOString(),
    });

    setNote({ title: '', body: '' });
    setIsExpanded(false);
  };

  const handleOpen = (e) => {
    console.log('Buka');
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    console.log('Tutup');
    e.preventDefault();
    setIsExpanded(false);
  };

  return (
    <>
      <div className="bg-white p-4 mb-4 rounded-lg outline outline-slate-200 hover:outline-slate-300  transition-[outline] duration-300">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder={isExpanded ? 'Judul catatan' : 'Tulis catatan...'}
              name="title"
              className="font-medium text-md text-slate-600 focus:outline-none w-full"
              value={note.title}
              onChange={handleChange}
              onFocus={handleOpen}
            />
            {isExpanded && <span className="text-xs text-slate-500 mr-4">{`${remainingTitleChars}/${TITLE_CHAR_LIMIT}`}</span>}
            <img
              src={isExpanded ? CloseIcon : PencilIcon}
              alt="edit-icon"
              className="w-6 cursor-pointer"
              onClick={isExpanded ? handleClose : handleOpen}
            />
          </div>

          <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
            <textarea
              id="body"
              placeholder="Tulis catatan..."
              name="body"
              className="font-normal text-sm text-slate-600 focus:outline-none w-full pt-4"
              value={note.body}
              onChange={handleChange}
              rows={4}
            ></textarea>
            <div className="flex justify-start gap-4 border-t border-slate-200 pt-4">
              <Button type="submit" variant="primary">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoteForm;
