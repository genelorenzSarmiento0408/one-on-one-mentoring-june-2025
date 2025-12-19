"use client";
import React from "react";
import NoteItem from "./NoteItem";
import { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[];
  onDeleteNote: (id: string, index: number) => Promise<void>;
  onUpdateNote: (
    id: string,
    index: number,
    newTitle: string,
    newDescription: string
  ) => Promise<void>;
  isLoading: boolean;
  onTogglePin: (id: string, isPinned: boolean) => Promise<void>;
};

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onDeleteNote,
  onUpdateNote,
  onTogglePin,
}) => {
  console.log(notes);
  if (!notes || notes.length === 0) {
    return <div className="text-center text-slate-700">No notes found</div>;
  }
  return (
    <div>
      {notes.map((note) => (
        <>{note.title}</>
      ))}
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={() => onDeleteNote(note.id, notes.indexOf(note))}
          onUpdate={() =>
            onUpdateNote(
              note.id,
              notes.indexOf(note),
              note.title,
              note.description
            )
          }
          onTogglePin={() => onTogglePin(note.id, note.isPinned)}
        />
      ))}
    </div>
  );
};

export default NoteList;
