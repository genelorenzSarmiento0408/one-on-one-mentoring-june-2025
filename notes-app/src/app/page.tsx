"use client";
import NoteForm from "@/components/NoteForm";
import NoteItem from "@/components/NoteItem";
import NoteList from "@/components/NoteList";
import SearchBar from "@/components/SearchBar";
import { useNotes } from "@/context/NotesContext";
import Image from "next/image";
import { useState, FormEvent, useEffect, useMemo } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { notes, isLoading, addNote, deleteNote, updateNote, togglePin } =
    useNotes();
  const filteredNotes = useMemo(() => {
    let results = notes;
    if (searchQuery.trim()) {
      results = notes.filter((note) => {
        const query = searchQuery.toLocaleLowerCase();
        return (
          note.title.toLocaleLowerCase().includes(query) ||
          note.description.toLocaleLowerCase().includes(query)
        );
      });
    }

    return [...results].sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      return a.isPinned ? -1 : 1;
    });
  }, [notes, searchQuery]);

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
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          {/* <NoteItem notes={notes} onDeleteNote={deleteNote} onUpdateNote={updateNote} /> */}
          {isLoading ? (
            <p className="text-center text-blue-500 text-lg">Loading...</p>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDeleteNote={async (id: string, index: number) =>
                deleteNote(id, index)
              }
              onUpdateNote={async (
                id: string,
                index: number,
                newTitle: string,
                newDescription: string
              ) =>
                updateNote(id, index, {
                  title: newTitle,
                  description: newDescription,
                })
              }
              isLoading={isLoading}
              onTogglePin={async (id: string, isPinned: boolean) =>
                togglePin(id, isPinned)
              }
            />
          )}
          <NoteForm />
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
