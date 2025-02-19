
"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress?: (progress: Number) => void;
    fileType?: "image" | "video"
}



export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = 'image'
}: FileUploadProps) {


    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const onError = (err) => {
        console.log("Error", err);
        setError(err.message)
        setUploading(false)
    };

    const handleSuccess = (response: IKUploadResponse) => {
        console.log("Success", response);
        setUploading(false)
        setError(null)
        onSuccess(response)
    };

    const handleStartUpload = () => {
        setUploading(true)
        setError(null)

    };

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const precentComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(precentComplete))
        }
        console.log("Start", evt);
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("please upload a video file ")
                return false;
            }
            if (file.size > 100 * 1024 * 1024) {
                setError("video Must be less than 100MBs")
                return false;
            }
        }
        else {
            const valiadImages = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
            if (!valiadImages.includes(file.type)) {
                setError("plz upload a valid file (jpg, jpeg, png , webp")
                return false
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("video Must be less than 5 MBs")
                return false;
            }
        }
        return false
    }



    return (
        <div className="space-y-2">
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"}
                // tags={["sample-tag1", "sample-tag2"]}
                // customCoordinates={"10,10,10,10"}
                // isPrivateFile={false}
                useUniqueFileName={true}
                // responseFields={["tags"]}
                validateFile={validateFile}
                // folder={"/sample-folder"}

                webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
                overwriteFile={true}
                overwriteAITags={true}
                overwriteTags={true}
                overwriteCustomMetadata={true}
                {/* customMetadata={{
            "brand": "Nike",
            "color": "red",
          }} */}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadProgress={handleProgress}
                onUploadStart={handleStartUpload}
                folder={fileType === "video" ? "/videos" : "/images"}
                transformation={{
                    pre: "l-text,i-Imagekit,fs-50,l-end",
                    post: [
                        {
                            type: "transformation",
                            value: "w-100",
                        },
                    ],
                }}
                style={{ display: 'none' }} // hide the default input and use the custom upload button

            />

            {
                uploading && (
                    <div className="flex items-center gap-2  text-sm  text-primary">
                        <Loader2 className="animate-spin w-4 h-4 " />
                        <span>Uploading...</span>
                    </div>
                )
            }
            {error && (
                <div className="text-error text-sm ">
                    {error}
                </div>
            )}
        </div>
    );
}