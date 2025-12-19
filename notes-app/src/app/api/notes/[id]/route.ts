import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NoteModel, { INote } from "@/models/Note";

dbConnect();

type RouteProps = {
  params: { id: string };
};
export async function PUT(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log(body);
    const { title, description } = body;
    if (!title || !description) {
      return NextResponse.json(
        { message: "New text is required." },
        { status: 400 }
      );
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found." }, { status: 404 });
    }

    console.log(updatedNote);
    return NextResponse.json({
      ...updatedNote.toJSON(),
      id: updatedNote._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    console.log("Deleting note with id:", id);
    const deletedNote = await NoteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}
