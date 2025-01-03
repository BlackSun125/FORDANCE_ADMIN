import React, { useState, useEffect } from "react";
import AdminTable from "../../components/Table/Table";

const Student = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: "created_at", headerName: "Created_at" },
        { field: "username", headerName: "Username" },
        { field: "email", headerName: "Email" },
        { field: "name", headerName: "Name" },
        { field: "phone", headerName: "Phone" },
        { field: "classes", headerName: "Classes" },
        { field: "sessions", headerName: "Sessions" },
        // { field: "feesPaid", headerName: "Fees Paid" },
    ];

    const actions = ["edit", "delete", "lock"];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/students");
                if (!response.ok) {
                    throw new Error(`Error fetching students: ${response.statusText}`);
                }
                const data = await response.json();
                setRows(data);
            } catch (error) {
                console.error("Error fetching student data:", error);
                setRows([]); // Optionally set rows to an empty array in case of error
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-page flex">
            <div className="flex-1 transition-all duration-300 pl-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Students Management</h1>
                    <AdminTable rows={rows} columns={columns} actions={actions} />;
                </div>
            </div>
        </div>
    );
};

export default Student;
