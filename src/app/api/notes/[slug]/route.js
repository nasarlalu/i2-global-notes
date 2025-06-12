import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/mongodb"
import { Notes } from "@/lib/model/notes"

export const GET = async (request, { params }) => {
    const { slug } = await params;
    try {
        await connectToDb();
        const note = await Notes.findOne({ slug });
        return NextResponse.json(note);
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch note!");
    }
};

export const DELETE = async (request, { params }) => {
    const { slug } = await params;

    try {
        await connectToDb();
        const deletedNote = await Notes.findOneAndDelete({ slug });

        if (!deletedNote) {
            return NextResponse.json(
                { message: 'Note not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Note deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { message: 'Failed to delete note' },
            { status: 500 }
        );
    }
};

export const PUT = async (request) => {
    try {
        await connectToDb();
        const { title, content, desc, slug, noteId, userId } = await request.json();
        const existingNote = await Notes.findById(noteId);

        if (!existingNote) {
            return new NextResponse('Note not found', { status: 404 });
        }

        const updatedNote = await Notes.findByIdAndUpdate(noteId, {
            title,
            content,
            desc,
            slug,
            noteId,
            userId,
        }, { new: true });

        return NextResponse.json({ status: 200, body: { message: 'Post Updated successfully', data: updatedNote } })
    }
    catch (err) {
        console.error(err);
        throw new Error(err, "Failed to create a new post!");
    }
};