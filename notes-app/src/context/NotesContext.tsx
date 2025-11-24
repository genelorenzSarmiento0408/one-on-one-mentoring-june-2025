"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Note } from "../components/NoteItem";

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  setNotes: (notes: Note[]) => void;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  setNotes: () => {},
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      const mappedNotes: Note[] = data.notes.map((note: Note) => ({
        title: note.title,
        description: note.description,
      }));
      setNotes(mappedNotes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (note: Note) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        const data = await response.json();
        fetchNotes();
        // setNotes((prevNotes) => [...prevNotes, data.note]);
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const NotesConsumer = NotesContext.Consumer;
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
