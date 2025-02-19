import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json({
            message: authenticationParameters,
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            error: "An error occurred while trying to authenticate with ImageKit",
            status: 500
        })
    }

}