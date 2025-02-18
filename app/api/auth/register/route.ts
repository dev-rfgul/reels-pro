import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User  from "@/models/user.model"



export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Email and password are required"
                },
                {
                    status: 400
                }
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                {
                    error: "Email already exists"
                },
                {
                    status: 400
                }
            )
        }

        await User.create({
            email,
            password,
        })

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "failed to create user" },
            { status: 500 }
        )

    }
}