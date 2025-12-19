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
  isLoading: boolean;
  addNote: (note: FormNoteData) => void;
  setNotes: (notes: Note[]) => void;
  deleteNote: (id: string, index: number) => void;
  updateNote: (id: string, index: number, updatedNote: FormNoteData) => void;
  togglePin: (id: string, isPinned: boolean) => void;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  isLoading: false,
  addNote: () => {},
  setNotes: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  togglePin: () => {},
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  console.log("--- NOTES PROVIDER IS MOUNTING ---"); // <-- Check for this log!
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notes", { cache: "no-store" });
      console.log("fetch received");
      console.log(response);
      if (!response.ok) throw new Error("failed to fetch notes");
      const data = await response.json();
      console.log(data);
      const mappedNotes: Note[] = data.map((note: Note) => ({
        id: note._id,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        isPinned: note.isPinned,
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
  const updateNote = async (
    id: string,
    index: number,
    updatedNote: FormNoteData
  ) => {
    try {
      console.log(updatedNote);
      const response = await fetch(`/api/notes/${id}`, {
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
  const togglePin = async (id: string) => {
    try {
      const note = notes.find((n) => n.id === id);
      if (!note) {
        console.error("Note not found");
        return;
      }

      const response = await fetch(`/api/notes/${id}/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPinned: !note.isPinned }),
      });
      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  const deleteNote = async (id: string, index: number) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
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
    isLoading,
    addNote,
    setNotes,
    deleteNote,
    updateNote,
    togglePin,
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
