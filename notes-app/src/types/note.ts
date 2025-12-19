export type Note = {
  _id: string;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
};

export type FormNoteData = {
  title: string;
  description: string;
};
