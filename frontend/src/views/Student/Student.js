import React, { useState, useEffect } from "react";
import AdminTable from "../../components/Table/Table";
import Loading from "../../components/Loading/Loading";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import {
    getAllStudents,
    updateStudent,
    deleteStudent,
} from "../../api/student/studentApi"; // Import API

const Student = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const columns = [
        { field: "created_at", headerName: "Created_at" },
        { field: "username", headerName: "Username" },
        { field: "email", headerName: "Email" },
        { field: "name", headerName: "Name" },
        { field: "phone", headerName: "Phone" },
        { field: "classes", headerName: "Classes" },
        { field: "sessions", headerName: "Sessions" },
    ];

    const actions = ["edit", "delete"];

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const { data } = await getAllStudents(); // Đảm bảo API trả về đúng dữ liệu
            setRows(data); // Gán dữ liệu vào rows
        } catch (error) {
            console.error("Error fetching student data:", error.message);
            alert("Failed to load students. Please try again.");
            setRows([]); // Optionally reset rows on error
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return <Loading />;

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setOpenEditModal(true);
    };

    const handleSaveEdit = async () => {
        if (!selectedStudent.name || !selectedStudent.email || !selectedStudent.phone) {
            alert("All fields are required.");
            return;
        }

        try {
            await updateStudent(selectedStudent.id, selectedStudent); // Gọi API cập nhật
            alert("Student updated successfully");
            setOpenEditModal(false);
            fetchStudents(); // Refresh data
        } catch (error) {
            console.error("Error updating student:", error.message);
            alert("Failed to update student. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this student?");
            if (!confirmDelete) return;

            await deleteStudent(id); // Gọi API xóa
            alert("Student deleted successfully");
            fetchStudents(); // Refresh danh sách
        } catch (error) {
            console.error("Error deleting student:", error.message);
            alert("Failed to delete student. Please try again.");
        }
    };


    const actionHandlers = {
        edit: handleEdit,
        delete: (row) => handleDelete(row.id),
    };

    return (
        <div className="dashboard-page flex">
            <div className="flex-1 transition-all duration-300 pl-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Students Management</h1>
                    <AdminTable
                        rows={rows}
                        columns={columns}
                        actions={actions}
                        actionHandlers={actionHandlers}
                    />
                </div>
            </div>

            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "600px",
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: "12px",
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Student
                    </Typography>
                    <Stack spacing={2}>
                        <input
                            type="text"
                            value={selectedStudent?.name || ""}
                            onChange={(e) =>
                                setSelectedStudent({ ...selectedStudent, name: e.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={selectedStudent?.email || ""}
                            onChange={(e) =>
                                setSelectedStudent({ ...selectedStudent, email: e.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            value={selectedStudent?.phone || ""}
                            onChange={(e) =>
                                setSelectedStudent({ ...selectedStudent, phone: e.target.value })
                            }
                            placeholder="Phone"
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                        <Button variant="text" onClick={() => setOpenEditModal(false)}>
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export default Student;
