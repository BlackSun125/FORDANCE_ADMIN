import React from "react";
import { FaBars, FaBell } from "react-icons/fa";
import avatar from '../../assets/img/149071.png'

// Header component
const Header = ({ toggleSidebar }) => {
    return (
        <header className="flex items-center justify-between bg-blue-500 px-4 py-3 text-white shadow-md h-16">
            {/* Sidebar Toggle Button */}
            <button
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
                className="focus:outline-none"
            >
                <FaBars size={20} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-4">
                <SearchBar />
            </div>

            {/* Notifications and Avatar */}
            <div className="flex items-center space-x-4">
                <Notifications />
                <Avatar />
            </div>
        </header>
    );
};

// Search Bar Component
const SearchBar = () => {
    return (
        <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Search for data"
        />
    );
};

// Notifications Component
const Notifications = () => {
    return (
        <button
            aria-label="Notifications"
            className="relative focus:outline-none"
        >
            <FaBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
    );
};

// Avatar Component
const Avatar = () => {
    return (
        <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
        />
    );
};

export default Header;
