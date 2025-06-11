import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export const Notes = mongoose.models?.Notes || mongoose.model("Notes", noteSchema);
