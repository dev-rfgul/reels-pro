"use client"

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/video.model";
import { useEffect, useState } from "react";


export default function Home() {
  const [Videos, setVideos] = useState<IVideo[]>([])


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos
        setVideos(data)
      } catch (error) {
        console.error("error fetching videos ",error)
      }
    }

    fetchVideos()
  })

  return (
    <div></div>
  );
}
