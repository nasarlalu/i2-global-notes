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

export const GET = async (request) => {
    try {
        await connectToDb();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const notes = await Notes.find({ userId });
        return NextResponse.json(notes);
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch notes!");
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

