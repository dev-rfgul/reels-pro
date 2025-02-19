import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video,{IVideo} from "@/models/video.model"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()
        const videos = Video.find({}).sort({ createdAt: -1 }).lean()
        if (!videos || (await videos).length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({ error: "failed to fetch videos", status: 200 })
    }

}
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectToDatabase()
        const body: IVideo = await request.json()
        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {

            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                widht: 1080,
                quality: body.transformation?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo)

    } catch (error) {
        return NextResponse.json({ error: "an error occured while creating vidoes" }, { status: 500 })

    }

}