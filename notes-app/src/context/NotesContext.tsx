"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { FormNoteData, Note } from "@/types/note";

interface NotesContextType {
  notes: Note[];
  addNote: (note: FormNoteData) => void;
  setNotes: (notes: Note[]) => void;
  deleteNote: (index: number) => void;
  updateNote: (index: number, updatedNote: Note) => void;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  setNotes: () => {},
  deleteNote: () => {},
  updateNote: () => {},
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

  const addNote = async (note: FormNoteData) => {
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
  //
  const updateNote = async (index: number, updatedNote: Note) => {
    try {
      const response = await fetch(`/api/notes/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (response.ok) {
        fetchNotes();
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (index: number) => {
    try {
      const response = await fetch(`/api/notes/${index}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const value: NotesContextType = {
    notes,
    addNote,
    setNotes,
    deleteNote,
    updateNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
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
