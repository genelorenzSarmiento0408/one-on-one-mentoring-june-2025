import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NoteModel, { INote } from "@/models/Note";

dbConnect();

export async function GET() {
  try {
    const notes: INote[] = await NoteModel.find({});
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();
    const newNote = await NoteModel.create({ title, description });
    const savedNote = await newNote.save();
    return NextResponse.json({ note: savedNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
