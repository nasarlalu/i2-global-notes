import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/lib/model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectToDb();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json(
                { message: "No user found" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return NextResponse.json({
            message: "Login successful",
            data: {
                userId: user._id,
                username: user.username,
                email: user.email,
                token,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
