import React, { useEffect, useState } from "react";
import { Lora } from "next/font/google";
import { FormNoteData, Note } from "@/types/note";
import { formatRelativeTime } from "@/utils/dateUtils";
const lora = Lora({
  variable: "--font-lora-sans",
  subsets: ["latin"],
});
type NoteItemProps = {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    index: number,
    newTitle: string,
    newDescription: string
  ) => Promise<void>;
  onTogglePin: (id: string, isPinned: boolean) => Promise<void>;
};
const notes: Note[] = [];

export default function NoteItem({
  note,
  onDelete,
  onUpdate,
  onTogglePin,
}: NoteItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log(JSON.stringify(note));
  const [editedNote, setEditedNote] = useState<FormNoteData>({ ...note });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  // useEffect(() => {
  //   if (!isEditing) {
  //     setEditedNote({ ...note });
  //   }
  // }, [note, isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Saving note...");
    console.log(editedNote);
    if (!editedNote.title.trim() || !editedNote.description.trim()) {
      alert("Title and Description cannot be empty.");
      setIsSaving(false);
      return;
    }

    if (
      editedNote.title === note.title &&
      editedNote.description === note.description
    ) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      console.log(editedNote);
      await onUpdate(
        note.id,
        notes.indexOf(note),
        editedNote.title.trim(),
        editedNote.description.trim()
      );
    } catch (error) {
      console.error("Error updating note:", error);
      alert("There was an error updating the note. Please try again.");
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await onDelete(note.id);
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("There was an error deleting the note. Please try again.");
      }
    }
  };
  console.log(note);
  return (
    <div className="space-y-3">
      {
        <div
          className="bg-white p-4 rounded-lg border-2 border-amber-700 shadow-md flex flex-col justify-between hover:shadow-lg"
          key={Math.random()}
        >
          <div className="text-xs text-gray-500 mt-2">
            <span>Created: {formatRelativeTime(note.createdAt)}</span>
            <span className="ml-4">
              Updated: {formatRelativeTime(note.updatedAt)}
            </span>
            <span className="ml-4">
              {note.isPinned ? "📌 Pinned" : "Unpinned"}
            </span>
          </div>
          <textarea
            className={`font-bold text-4xl ${lora.variable} ${
              isEditing ? "border-b-2 border-amber-700" : ""
            } mb-4 resize-none overflow-hidden break-words cursor-pointer`}
            disabled={isEditing ? false : true}
            onChange={(e) =>
              setEditedNote({
                title: e.target.value,
                description: editedNote.description,
              })
            }
            value={isEditing ? editedNote.title : note.title}
          ></textarea>
          <textarea
            className={`flex-grow text-gray-700 mr-3 overflow-hidden break-words cursor-pointer  ${
              isEditing ? "border-b-2 border-amber-700" : ""
            } mb-4 resize-none overflow-hidden break-words cursor-pointer`}
            disabled={isEditing ? false : true}
            onChange={(e) =>
              setEditedNote({
                title: editedNote.title,
                description: e.target.value,
              })
            }
            value={isEditing ? editedNote.description : note.description}
          ></textarea>
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              return isEditing ? handleSave() : setIsEditing(true);
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => onTogglePin(note.id, note.isPinned)}
            title={note.isPinned ? "Unpin note" : "Pin note"}
          >
            {note.isPinned ? "Unpin" : "Pin"}
          </button>
        </div>
      }
    </div>
  );
}
