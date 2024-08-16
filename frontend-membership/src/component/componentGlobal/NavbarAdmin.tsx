import { useState, FC } from "react";
import { Link } from "react-router-dom";

const NavbarAdmin: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <button
                className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>


            <div
                className={`fixed inset-y-0 left-0 w-64 bg-green-500 text-white transform h-[100vh] ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform md:relative md:translate-x-0 md:flex md:flex-col`}
            >
                <button
                    className="p-2 text-gray-700 bg-gray-200 md:hidden hover:bg-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <div className="p-4">
                    <h2 className="text-lg font-bold text-[black]">Admin</h2>
                    <nav className="flex flex-col mt-4">
                        <ul>
                            <Link to="/admin">
                                <li className="py-2 hover:bg-green-600 rounded pl-4">
                                    <Link to="/admin">Dashboard</Link>
                                </li>
                            </Link>


                            <Link to="/admin/Video">
                                <li className="py-2 hover:bg-green-600 rounded pl-4">
                                    <Link to="/admin/Video">Table Video</Link>
                                </li>
                            </Link>

                            <Link to="/admin/Article">
                                <li className="py-2 hover:bg-green-600 rounded pl-4">
                                    <Link to="/admin/Article">Table Article</Link>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavbarAdmin;
