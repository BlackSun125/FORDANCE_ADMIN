import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content */}
            <div
                className={`flex-1 transition-all duration-300`}
            >
                <Header toggleSidebar={toggleSidebar} />
                <div className="p-4 overflow-auto">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
