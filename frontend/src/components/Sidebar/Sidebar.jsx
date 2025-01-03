import React, { useState } from "react";
import {
    FaUser,
    FaGraduationCap,
    FaChartBar,
    FaSignOutAlt,
    FaAngleDown,
    FaFileAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");
    const navigate = useNavigate();

    const menuItems = [
        { icon: FaUser, label: "Instructors Management", path: "/instructors" },
        { icon: FaGraduationCap, label: "Student Management", path: "/students" },
        { icon: FaChartBar, label: "Report", path: "/income-report" },
        { icon: FaSignOutAlt, label: "Log Out", action: () => handleLogout() },
    ];

    const dropdownItems = [
        { label: "Sessions", path: "/sessions" },
        { label: "Classes", path: "/classes" },
        { label: "Comments", path: "/comments" },
    ];

    const handleLogout = () => {
        console.log("User logged out");
        // Xóa token khỏi localStorage hoặc sessionStorage
        localStorage.removeItem("authToken");

        // Điều hướng về trang login sau khi logout
        navigate("/login");
    };

    return (
        <>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`sidebar ${isSidebarOpen ? "" : "hidden"} bg-white shadow-lg min-h-screen w-64`}
            >
                {/* Logo Section */}
                <div className="bg-blue-500 text-white text-lg font-bold p-4 text-center h-16 flex items-center justify-center">
                    DANCING APP
                </div>

                {/* Content Management Section */}
                <div className="p-4 border-b">
                    <button
                        className="w-full flex justify-between items-center text-gray-700 font-semibold hover:text-blue-500 transition"
                        onClick={() => setOpenDropdown(!openDropdown)}
                    >
                        <div className="flex items-center gap-2">
                            <FaFileAlt />
                            <span>Content Management</span>
                        </div>
                        <FaAngleDown
                            className={`transition-transform ${openDropdown ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>
                    {openDropdown && (
                        <div className="flex flex-col gap-3 pt-3">
                            {dropdownItems.map((item, index) => (
                                <Link
                                    to={item.path}
                                    key={index}
                                    onClick={() => setActiveMenu(item.label)}
                                    className={`flex items-center justify-between p-2 rounded-lg shadow transition 
                                        ${activeMenu === item.label
                                            ? "bg-blue-100 border border-blue-500 text-blue-500"
                                            : "bg-gray-50 hover:bg-blue-50 text-gray-700"
                                        }`}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Menu */}
                <div className="flex-1 p-4">
                    {menuItems.map((menu, index) =>
                        menu.action ? (
                            <div
                                key={index}
                                onClick={menu.action}
                                className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition hover:bg-gray-50 text-gray-700"
                            >
                                <menu.icon />
                                <span>{menu.label}</span>
                            </div>
                        ) : (
                            <Link
                                to={menu.path}
                                key={index}
                                onClick={() => setActiveMenu(menu.label)}
                                className={`flex items-center gap-3 p-2 rounded-lg transition 
                                    ${activeMenu === menu.label
                                        ? "bg-blue-100 border border-blue-500 text-blue-500"
                                        : "hover:bg-gray-50 text-gray-700"
                                    }`}
                            >
                                <menu.icon />
                                <span>{menu.label}</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
