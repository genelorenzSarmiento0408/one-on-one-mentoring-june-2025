import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NoteModel from "@/models/Note";

type RouteContext = {
  params: { id: string };
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  await dbConnect();
  try {
    const { id } = await params;
    const { isPinned } = await request.json();
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { isPinned },
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
      { message: "Failed to update note pin status" },
      { status: 500 }
    );
  }
}
