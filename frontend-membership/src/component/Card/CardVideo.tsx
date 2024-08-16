import React from "react";

interface CardVideoProps {
    id: number;
    title: string;
    url: string;
    description: string;
    isLocked: boolean;
}

const CardVideo: React.FC<CardVideoProps> = ({ id, title, url, description, isLocked }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative h-[350px] w-[80%] " >
            {isLocked && (
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">🔒</span>
                </div>
            )}
            <div className="relative">
                <video
                    src={`http://localhost:5000/uploads/${url}`}
                    controls
                    className={`w-full h-40 object-cover ${isLocked ? "opacity-50" : ""}`}
                // disabled={isLocked}
                >
                    Your browser does not support the video tag.
                </video>

            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>

            </div>
        </div>
    );
};

export default CardVideo;
