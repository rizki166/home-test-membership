import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CardArticle from "../component/Card/CardArticle";
import { Article } from "../types/app";

const ArticlePage: React.FC = () => {
    const location = useLocation();
    const [membershipType, setMembershipType] = useState<"A" | "B" | "C" | undefined>(undefined);
    const [articles, setArticles] = useState<Article[]>([]);

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

        axios.get("http://localhost:5000/article")
            .then(response => {
                setArticles(response.data.articles);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
            });
    }, [location.state]);

    const contentLimits: Record<"A" | "B" | "C", number | string> = {
        A: 3,
        B: 6,
        C: "unlimited",
    };

    const articleLimit = membershipType ? contentLimits[membershipType] : "unlimited";

    const filteredArticles = articleLimit === "unlimited"
        ? articles
        : articles.slice(0, Number(articleLimit));

    const showAllWithLock = membershipType === undefined;

    return (
        <div className="min-h-screen bg-gray-100 p-8 mt-12">
            <h2 className="text-3xl font-bold mb-4">Articles</h2>

            <p className="mb-4">
                You get access to{" "}articles
                <strong>{articleLimit === "unlimited" ? "all" : articleLimit}</strong>{" "}
                articles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                    <CardArticle
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        content={article.content}
                        isLocked={showAllWithLock ? true : articleLimit === "unlimited" ? false : article.id > Number(articleLimit)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlePage;
