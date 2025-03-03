import PropTypes from "prop-types";
import React, { useState, useContext } from "react";

import LanguageContext from "../contexts/LanguageContext";

import Button from "./common/Button";

import CloseIcon from "../assets/icons/close.svg";
import PencilIcon from "../assets/icons/pencil-subtle.svg";

function NoteForm({ onAddNote }) {
  const TITLE_CHAR_LIMIT = 50;

  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    body: "",
  });

  const { translate } = useContext(LanguageContext);

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

    setNote({ title: "", body: "" });
    setIsExpanded(false);
  };

  const handleOpen = (e) => {
    console.log("Buka");
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    console.log("Tutup");
    e.preventDefault();
    setIsExpanded(false);
  };

  return (
    <>
      <div className="mb-4 rounded-lg bg-white p-4 outline outline-slate-200 hover:outline-slate-300 dark:bg-slate-800 dark:outline-slate-700">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder={
                isExpanded ? translate("noteTitle") : translate("writeNote")
              }
              name="title"
              className="text-md w-full bg-inherit font-medium text-slate-600 focus:outline-none"
              value={note.title}
              onChange={handleChange}
              onFocus={handleOpen}
            />
            {isExpanded && (
              <span className="mr-4 text-xs text-slate-500">{`${remainingTitleChars}/${TITLE_CHAR_LIMIT}`}</span>
            )}
            <img
              src={isExpanded ? CloseIcon : PencilIcon}
              alt="edit-icon"
              className="w-6 cursor-pointer"
              onClick={isExpanded ? handleClose : handleOpen}
            />
          </div>

          <div
            className={`space-y-4 transition-all duration-300 ${
              isExpanded
                ? "h-auto opacity-100"
                : "h-0 overflow-hidden opacity-0"
            }`}
          >
            <textarea
              id="body"
              placeholder={translate("writeNote")}
              name="body"
              className="w-full bg-inherit pt-4 text-sm font-normal text-slate-600 focus:outline-none"
              value={note.body}
              onChange={handleChange}
              rows={4}
            ></textarea>
            <div className="flex justify-start gap-4 border-t border-slate-200 pt-4 dark:border-slate-700">
              <Button type="submit" variant="primary">
                {translate("save")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

NoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default NoteForm;
