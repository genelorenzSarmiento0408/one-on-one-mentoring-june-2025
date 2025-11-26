"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useNotes } from "@/context/NotesContext";
import { Note } from "@/types/note";
import { title } from "process";

export default function NoteForm() {
  const [note, setNote] = useState({ title: "", description: "" });
  const { addNote } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (note.title || note.description) {
      addNote(note);
    }

    // the latest note to be the first in the array
    // setNotes([{ id: Date.now(), title: noteText.trim(), description: "" }, ...notes]);
    // console.log(notes);
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Add a New Note</h2>
      <input
        name="title"
        type="text"
        className="w-full p-3 border border-gray-400 rounded-md"
        placeholder="Note Title"
        value={note.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
        rows={3}
        placeholder="place here your notes"
        value={note.description}
        onChange={handleChange}
      ></textarea>
    </form>
  );
}
