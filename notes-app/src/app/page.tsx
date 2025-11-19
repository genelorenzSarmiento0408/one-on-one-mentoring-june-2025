"use client";
import NoteItem, { Note } from "@/components/NoteItem";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const [noteText, setNoteText] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      setNoteText("");
    }
    // the latest note to be the last in the array
    setNotes([
      ...notes,
      { id: Date.now(), title: noteText.trim(), description: "" },
    ]);

    // the latest note to be the first in the array
    // setNotes([{ id: Date.now(), title: noteText.trim(), description: "" }, ...notes]);
    // console.log(notes);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (notes.length === 0) {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
        return;
      }
      const notesJson = JSON.stringify(notes);
      localStorage.setItem("notes", notesJson);
      // console.log("Notes updated:", notes);
    }
  }, [notes]);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-row sm:flex-col flex-wrap">
          <NoteItem />
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
              rows={3}
              placeholder="place here your notes"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <button type="submit">Add Note</button>
          </form>
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-md w-full max-w-md"
            >
              <strong>{note.title}</strong>
              {note.description}
              {/* delete button */}
              <button
                className="ml-4 text-red-500 hover:underline"
                onClick={() => {
                  setNotes(notes.filter((_, i) => i !== index));
                  // 1. filters out first occurrence of the note to be deleted
                  // notes.filter((n) => n !== note)
                  // 2. set the data again to the filtered notes
                  // setNotes(...)
                }}
              >
                Delete
              </button>
              {/* edit button  */}
              <button
                className="ml-4 text-blue-500 hover:underline"
                onClick={() => {
                  const editedText = prompt(
                    "Edit your note:",
                    note.description
                  );
                  if (editedText !== null) {
                    const updatedNotes = [...notes];
                    updatedNotes[index].description = editedText;
                    setNotes(updatedNotes);
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
