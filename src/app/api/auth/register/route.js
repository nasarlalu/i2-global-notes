import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/mongodb"
import { User } from "@/lib/model/user"
import bcryptjs from "bcryptjs"

export async function POST(request) {
    try {
        await connectToDb();

        const reqBody = await request.json()
        const { username, email, password } = reqBody
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists, Try different email id" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}