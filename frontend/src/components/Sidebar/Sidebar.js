import React, { useState } from "react";
import {
    FaUser,
    FaGraduationCap,
    FaChartBar,
    FaSignOutAlt,
    FaAngleDown,
    FaFileAlt,
} from "react-icons/fa";

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Content Management");

    const menuItems = [
        { icon: FaUser, label: "Instructors Management" },
        { icon: FaGraduationCap, label: "Student Management" },
        { icon: FaChartBar, label: "Statistic" },
        { icon: FaSignOutAlt, label: "Log Out" },
    ];

    return (
        <div className="w-64 min-h-screen bg-gray-100 shadow-md flex flex-col">
            {/* Logo Section */}
            <div className="bg-blue-500 text-white text-lg font-bold p-4 text-center">
                Admin Dashboard
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
                        className={`transition-transform ${openDropdown ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </button>
                {openDropdown && (
                    <div className="flex flex-col gap-2 pt-2">
                        {["Sessions", "Classes", "Comment"].map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded-md shadow hover:bg-blue-50 transition"
                            >
                                <span className="text-gray-700 font-medium">{item}</span>
                                <span className="bg-blue-500 text-white px-2 py-1 text-sm rounded-full">
                                    8
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Other Sections */}
            <div className="flex-1 p-4 flex flex-col gap-4 text-gray-700">
                {menuItems.map((menu, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveMenu(menu.label)}
                        className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition 
                            ${activeMenu === menu.label
                                ? "bg-blue-100 text-blue-500"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                    >
                        <menu.icon />
                        <span>{menu.label}</span>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
                <span>© 2024 Admin Panel. </span>
                <a
                    href="#"
                    className="text-blue-500 hover:underline"
                >
                    Privacy Policy
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
