import React from 'react';
import { Link } from 'react-router-dom';

const NavbarUser: React.FC = () => {
    return (
        <nav className="bg-green-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-semibold">

                </div>
                <div className="space-x-4">
                    <Link
                        to="/userVideo"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                    >
                        content Video
                    </Link>
                    <Link
                        to="/userArticle"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded"
                    >
                        content Article
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
