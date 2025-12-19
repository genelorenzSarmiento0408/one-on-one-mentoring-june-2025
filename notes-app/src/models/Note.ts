import mongoose, { Document, Model, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  description: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema<INote> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
export default Note;
