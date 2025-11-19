import React from "react";
import { Lora } from "next/font/google";
const lora = Lora({
  variable: "--font-lora-sans",
  subsets: ["latin"],
});
export type Note = {
  id: number;
  title: string;
  description: string;
};
const notes: Note[] = [];

export default function NoteItem() {
  return (
    <div className="space-y-3">
      <h2 className={`text-2xl font-semibold ${lora.className}`}>Your Notes</h2>
      {notes[0] ? (
        notes.map(({ id, title, description }) => (
          <div
            className="bg-white p-4 rounded-lg border-2 border-amber-700 shadow-md flex flex-col justify-between hover:shadow-lg"
            key={id}
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
