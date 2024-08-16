import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CardVideo from "../component/Card/CardVideo";
import { Video } from "../types/app";

const VideoPage: React.FC = () => {
    const location = useLocation();
    const [membershipType, setMembershipType] = useState<"A" | "B" | "C" | undefined>(undefined);
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const state = location.state as { membershipType: "A" | "B" | "C" } | undefined;
        if (state) {
            setMembershipType(state.membershipType);
            localStorage.setItem("membershipType", state.membershipType);
        } else {
            const savedMembershipType = localStorage.getItem("membershipType") as "A" | "B" | "C" | null;
            if (savedMembershipType) {
                setMembershipType(savedMembershipType);
            } else {
                setMembershipType(undefined);
            }
        }

        axios.get("http://localhost:5000/video")
            .then(response => {
                setVideos(response.data.videos);
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }, [location.state]);

    const contentLimits: Record<"A" | "B" | "C", number | string> = {
        A: 3,
        B: 6,
        C: "unlimited",
    };

    const videoLimit = membershipType ? contentLimits[membershipType] : "unlimited";

    const filteredVideos = videoLimit === "unlimited"
        ? videos
        : videos.slice(0, Number(videoLimit));

    const showAllWithLock = membershipType === undefined;

    return (
        <div className="min-h-screen bg-gray-100 p-8 mt-12">
            <h2 className="text-3xl font-bold mb-4">Hello Membership </h2>
            <p className="mb-4">
                You get access to{" "}videos
                <strong>{videoLimit === "unlimited" ? "all" : videoLimit}</strong>{" "}
                videos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredVideos.map((video) => (
                    <CardVideo
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        url={video.url}
                        description={video.description}
                        isLocked={showAllWithLock ? true : videoLimit === "unlimited" ? false : video.id > Number(videoLimit)}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoPage;
