import React, { useState } from "react";
import { Lora } from "next/font/google";
import { FormNoteData, Note } from "@/types/note";
const lora = Lora({
  variable: "--font-lora-sans",
  subsets: ["latin"],
});
type NoteItemProps = {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    newTitle: string,
    newDescription: string
  ) => Promise<void>;
};
const notes: Note[] = [];

export default function NoteItem({ note, onDelete, onUpdate }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [editedNote, setEditedNote] = useState<FormNoteData>({ ...note });
  return (
    <div className="space-y-3">
      <h2 className={`text-2xl font-semibold ${lora.className}`}>Your Notes</h2>
      {notes[0] ? (
        notes.map(({ title, description }) => (
          <div
            className="bg-white p-4 rounded-lg border-2 border-amber-700 shadow-md flex flex-col justify-between hover:shadow-lg"
            key={Math.random()}
          >
            <h1 className="font-bold text-4xl">{title}</h1>
            <p className="flex-grow text-gray-700 mr-3 overflow-hidden break-words cursor-pointer">
              {description}
            </p>
          </div>
        ))
      ) : (
        <div className="text-2xl">No notes yet</div>
      )}
    </div>
  );
}
