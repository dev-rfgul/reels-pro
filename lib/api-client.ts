// import { IVideo } from "@/models/video.model"
// export type VideoFormData = Omit<IVideo, "_id">
// type fetchOptions = {
//     method?: "GET" | "POST" | "PUT" | "DELETE",
//     body: any,
//     header?: Record<string, string>
// }

// class ApiClient {
//     private async fetch<T>(
//         endpoint: string,
//         options: fetchOptions = {}
//     ): Promise<T> {
//         const { method = "GET", body, header = {} } = options
//         const defaultHeaders = {
//             "Content-Type": "application/json",
//             ...header
//         }
//         const response = await fetch(`/api${endpoint}`,
//             {
//                 method,
//                 headers: defaultHeaders,
//                 body: body ? JSON.stringify(body) : undefined
//             }
//         )
//         if (!response.ok) {
//             throw new Error(await response.text())
//         }
//         return response.json()
//     }
//     async getVideos() {
//         return this.fetch<IVideo[]>('/videos')
//     }
//     async getAVideo(id: string) {
//         return this.fetch<IVideo>(`/videos/${id}`)
//     }
//     async createVideo(videoData: VideoFormData) {
//         return this.fetch('/videos', {
//             method: "POST",
//             body: videoData
//         })
//     }
// }

// export const apiClient = new ApiClient()

import { IVideo } from "@/models/video.model"

export type VideoFormData = Omit<IVideo, "_id">

type fetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any, // Make this optional to prevent passing undefined explicitly
    headers?: Record<string, string> // Fix the typo: 'header' → 'headers'
}

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: fetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }
        const response = await fetch(`/api${endpoint}`,
            {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined
            }
        )
        if (!response.ok) {
            throw new Error(await response.text())
        }
        return response.json()
    }

    async getVideos() {
        return this.fetch<IVideo[]>('/videos')
    }

    async getAVideo(id: string) {
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData: VideoFormData) {
        return this.fetch('/videos', {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient()
