import React, { useEffect, useState } from "react";
import AdminTable from "../../components/Table/Table";
import axios from "axios";

const Classes = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "class_name", headerName: "Class Name" },
        { field: "what_learn", headerName: "What to Learn" },
        { field: "what_prepare", headerName: "What to Prepare" },
        { field: "level", headerName: "Level" },
        { field: "genre", headerName: "Genre" },
    ];

    const actions = ["edit", "delete", "lock"];

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/classes");
                setRows(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex-1 transition-all duration-300 pl-0 ">
            <div className="p-6">
                <h1 className="text-3xl font-bold">Welcome to Classes</h1>
                <AdminTable rows={rows} columns={columns} actions={actions} />
            </div>
        </div>
    );
};

export default Classes;
