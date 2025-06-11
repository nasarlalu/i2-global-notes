import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/mongodb"
import { Notes } from "@/lib/model/notes"
import jwt from "jsonwebtoken"

async function verifyToken(request) {

    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("No token provided")
    }
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    console.log(decoded, "decoded from verifyToken")
    return decoded
}

export const GET = async () => {
    try {
        await connectToDb();
        const notes = await Notes.find();
        return NextResponse.json(notes);
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch notes!");
    }
};

export const DELETE = async (request) => {
    const body = await request.json();
    const { notes_id } = body
    console.log(notes_id, 'notes_id');
    try {
        connectToDb();
        const notes = await Notes.findById(notes_id);
        if (!notes) {
            return NextResponse.json({ status: 404, body: { message: 'Notes not found' } })
        }
        await notes.deleteOne();
        return NextResponse.json({ status: 200, body: { message: 'Notes deleted successfully' } })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, body: { message: 'Failed to delete Notes' } })
    }
};

export const PUT = async (request) => {
    try {
        await connectToDb();

        const formData = await request.formData();
        const body = await formData.get("data");
        const {
            title,
            desc,
            content,
            createdAt,
            updatedAt,
            userId,
            notesId,
            slug, } = JSON.parse(body);
        const existingPost = await Notes.findById(notesId);

        if (!existingPost) {
            return new NextResponse('Blog not found', { status: 404 });
        }

        const updatedPost = await Notes.findByIdAndUpdate(notesId, {
            title,
            desc,
            content,
            createdAt,
            updatedAt,
        }, { new: true });

        return NextResponse.json({ status: 200, body: { message: 'Post Updated successfully' } })
    }
    catch (err) {
        console.error(err);
        throw new Error(err, "Failed to create a new post!");
    }
};

export const POST = async (request) => {
    try {
        await connectToDb();
        const decoded = await verifyToken(request);

        const { title, content, desc, slug } = await request.json();
        if (!title?.trim() || !content?.trim()) {
            return NextResponse.json(
                { message: "Title and content are required" },
                { status: 400 }
            );
        }

        // Create new note
        const newNote = new Notes({
            title: title.trim(),
            content: content.trim(),
            userId: decoded.userId,
            desc: desc.trim(),
            slug: slug.trim(),
        });

        const savedNote = await newNote.save();

        return NextResponse.json(savedNote, { status: 201 });

    } catch (error) {
        console.error("Create note error:", error.message);

        return NextResponse.json(
            {
                message: error.message.includes("token")
                    ? error.message
                    : "Failed to create note"
            },
            {
                status: error.message.includes("token") ? 401 : 500
            }
        );
    }
}

