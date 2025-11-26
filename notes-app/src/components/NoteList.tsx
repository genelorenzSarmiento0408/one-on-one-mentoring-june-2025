"use client";
import React from "react";
import NoteItem from "./NoteItem";
import { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[];
  onDeleteNote: (id: string) => Promise<void>;
  onUpdateNote: (
    id: string,
    newTitle: string,
    newDescription: string
  ) => Promise<void>;
};

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onDeleteNote,
  onUpdateNote,
}) => {
  if (!notes || notes.length === 0) {
    return <div className="text-center text-slate-700">No notes found</div>;
  }
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note.id} />
      ))}
    </div>
  );
};
