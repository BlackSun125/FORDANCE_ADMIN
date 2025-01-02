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
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Content */}
                <div
                    className="flex-1 p-4 overflow-auto"
                    style={{
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
