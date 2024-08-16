import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Video } from "../types/app";




const DataVideo: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideo, setNewVideo] = useState({
        title: "",
        description: "",
        url: null as File | null
    });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("http://localhost:5000/video");
                setVideos(response.data.videos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

    const totalPages = Math.ceil(videos.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = videos.slice(offset, offset + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewVideo({ ...newVideo, url: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", newVideo.title);
        formData.append("description", newVideo.description);
        if (newVideo.url) {
            formData.append("url", newVideo.url);
        }

        try {
            await axios.post("http://localhost:5000/video", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNewVideo({ title: "", description: "", url: null });
            closeModal();

            const response = await axios.get("http://localhost:5000/video");
            setVideos(response.data.videos);
        } catch (error) {
            setError("Failed to add video.");
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 px-4">
            <div style={{ width: "100%", display: "flex", justifyContent: "end", marginRight: "60px" }}>
                <button
                    onClick={openModal}
                    className="mb-4 py-2 px-6 text-white bg-green-600 rounded hover:bg-green-700 transition"
                >
                    Add Video
                </button>
            </div>
            <div className="overflow-x-auto w-full max-w-screen-lg mb-4">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Video</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Title</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((video) => (
                            <tr key={video.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                                    <video style={{ width: "50px", height: "50px" }} controls className="object-cover">
                                        <source src={`http://localhost:5000/uploads/${video.url}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{video.title}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{video.description}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <Link to={`/edit-video/${video.id}`} className="text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <Link to={`/delete-video/${video.id}`} className="text-red-500 hover:underline">
                                            Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center space-x-2 mb-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="py-2 px-4 text-white bg-gray-600 rounded hover:bg-gray-700 transition"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`py-2 px-4 rounded ${index === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="py-2 px-4 text-white bg-gray-600 rounded hover:bg-gray-700 transition"
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">Add New Video</h3>
                        {error && <div className="text-red-600 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newVideo.title}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={newVideo.description}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Video URL</label>
                                <input
                                    type="file"
                                    name="url"
                                    onChange={handleFileChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    accept="video/*"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="py-2 px-4 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                                >
                                    Add Video
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataVideo;
