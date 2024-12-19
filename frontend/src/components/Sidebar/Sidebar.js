import React, { useState } from "react";
import { FaUser, FaGraduationCap, FaChartBar, FaSignOutAlt, FaAngleDown, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div className="w-64 min-h-screen bg-gray-50 shadow-md flex flex-col">
            {/* Content Management Section */}
            <div className="p-4">
                <button
                    className="w-full flex justify-between items-center text-gray-700 font-semibold hover:text-blue-500"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    <div className="flex items-center gap-2">
                        <FaFileAlt />
                        Content Management
                    </div>
                    <FaAngleDown />
                </button>
                {openDropdown && (
                    <div className="mt-2 flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                            <span>Sessions</span>
                            <span className="bg-gray-300 px-2 py-1 text-sm rounded-full">8</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                            <span>Classes</span>
                            <span className="bg-gray-300 px-2 py-1 text-sm rounded-full">8</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                            <span>Comment</span>
                            <span className="bg-gray-300 px-2 py-1 text-sm rounded-full">8</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Other Sections */}
            <div className="flex-1 p-4 flex flex-col gap-4 text-gray-700">
                <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                    <FaUser />
                    Instructors Management
                </div>
                <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                    <FaGraduationCap />
                    Student Management
                </div>
                <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                    <FaChartBar />
                    Statistic
                </div>
                <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                    <FaSignOutAlt />
                    Log Out
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
