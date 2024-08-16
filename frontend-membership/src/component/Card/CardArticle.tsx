import React from "react";

interface CardArticleProps {
    id: number;
    title: string;
    content: string;
}

const CardArticle: React.FC<CardArticleProps> = ({ id, title, content }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">Article {id}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{content}</p>
                <a
                    href={`/articles/${id}`}
                    className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default CardArticle;
