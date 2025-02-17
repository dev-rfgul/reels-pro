import mongoose, { Schema, StringExpressionOperatorReturningArray, model, models } from 'mongoose';


export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const // as const is used to make sure that the object is not mutable and it will be treated as a constant
export interface IVideo {
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    _id?: mongoose.Types.ObjectId,
    controls?: boolean,
    transformation: {
        height: number,
        widht: number,
        quality?: number
    }
    createdAt?: Date,
    updatedAt: Date,
}

const VideoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        quality: { type: Number, min: 1, max: 100 }
    }
}, { timestamps: true })

const Video = models?.Video || model("Video", VideoSchema)
export default Video;