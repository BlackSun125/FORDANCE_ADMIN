import React from "react";
import { FaBars, FaBell } from "react-icons/fa"; // Thư viện icon
import "./Header.css";

const Header = ({ onToggleSidebar }) => {
    return (
        <div className="header-container flex items-center justify-between bg-blue-200 px-4 py-2 shadow-md">
            {/* Menu Icon */}
            <button className="menu-icon" onClick={onToggleSidebar}>
                <FaBars size={20} />
            </button>

            {/* Search Bar */}
            <div className="search-bar flex-1 mx-4">
                <input
                    type="text"
                    className="search-input w-full px-3 py-2 rounded-md"
                    placeholder="Search for data"
                />
            </div>

            {/* Notification & Avatar */}
            <div className="header-icons flex items-center space-x-4">
                <FaBell size={20} className="notification-icon" />
                <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="user-avatar rounded-full w-10 h-10"
                />
            </div>
        </div>
    );
};

export default Header;
