import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/mongodb"
import { Notes } from "@/lib/model/notes"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

async function verifyToken(request) {

    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("No token provided")
    }
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
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
export async function POST(request) {
    try {
        connectToDb()
        const decoded = await verifyToken(request)
        const { title, content } = await request.json()

        if (!title || !content) {
            return NextResponse.json({ message: "Title and content are required" }, { status: 400 })
        }
        const createdNote = await Notes.findOne({ _id: result.insertedId })

        return NextResponse.json(createdNote)
    } catch (error) {
        console.error("Create note error:", error)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
}
