import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Article } from "../types/app";




const DataArticle: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: "", content: "" });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/article");
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = articles.slice(offset, offset + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/article", newArticle);
            setNewArticle({ title: "", content: "" });
            closeModal();
            // Refresh the articles list
            const response = await axios.get("http://localhost:5000/article");
            setArticles(response.data.articles);
        } catch (error) {
            setError("Failed to add article.");
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <div style={{ display: "flex", justifyContent: "flex-end", width: "90%" }}>
                <button
                    onClick={openModal}
                    className="mb-4 py-2 px-4 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Add Article
                </button>
            </div>
            <div className="overflow-x-auto w-[90%] max-w-6xl mb-4">
                <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Title</th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Content</th>
                            <th className="py-3 px-4 bg-gray-100 border-b text-left text-sm font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b text-sm text-gray-700">{article.title}</td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700 truncate max-w-[300px]">{article.content}</td>
                                <td className="py-3 px-4 border-b text-sm text-gray-700">
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Link to={`/edit-article/${article.id}`} className="text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <Link to={`/edit-article/${article.id}`} className="text-blue-500 hover:underline">
                                            Hapus
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="py-2 px-4 text-white bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
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
                    className="py-2 px-4 text-white bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">Add New Article</h3>
                        {error && <div className="text-red-600 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newArticle.title}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    name="content"
                                    value={newArticle.content}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="py-2 px-4 mr-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Add Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataArticle;
