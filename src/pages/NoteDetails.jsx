import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";

import LanguageContext from "../contexts/LanguageContext";

import {
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";

import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Loading from "../components/common/Loading";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { translate, language } = useContext(LanguageContext);

  useEffect(() => {
    fetchNote();
  }, [id, navigate]);

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
    return <Loading />;
  }

  if (!note) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col justify-between">
      <Header showSearchBar={false} />
      <div className="mx-auto flex w-[1080px] flex-1 flex-col gap-2 p-4 pb-8">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            icon={ArrowLeftIcon}
            onClick={handleBackButton}
          >
            {translate("back")}
          </Button>
          <div className="flex gap-1">
            <Button variant="secondary" icon={TrashIcon} onClick={handleDelete}>
              {translate("delete")}
            </Button>
            <Button
              variant="secondary"
              icon={
                note.archived ? ArchiveBoxXMarkIcon : ArchiveBoxArrowDownIcon
              }
              onClick={handleArchiveToggle}
            >
              {note.archived ? translate("unarchive") : translate("archive")}
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-full flex-col pb-2">
            <h1 className="border-b border-slate-200 pb-4 text-3xl font-medium dark:border-slate-700">
              {note.title}
            </h1>
            <p className="cursor-default pb-6 pt-2 text-sm font-normal text-slate-400">
              {showFormattedDate(note.createdAt, language)}{" "}
              {note.archived ? " • " + translate("inArchive") : ""}
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
