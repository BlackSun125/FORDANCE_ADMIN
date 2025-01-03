import React, { useEffect, useState } from "react";
import AdminTable from "../../components/Table/Table";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Modal, Box, Typography, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { updateClass, deleteClass } from "../../api/classes/classesApi";

const Classes = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const { handleSubmit, register } = useForm();

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "class_name", headerName: "Class Name" },
        { field: "what_learn", headerName: "What to Learn" },
        { field: "what_prepare", headerName: "What to Prepare" },
        { field: "level", headerName: "Level" },
        { field: "genre", headerName: "Genre" },
        { field: "instructor_username", headerName: "Instructor Name" },
        { field: "session_count", headerName: "Session Count" },
    ];

    const actions = ["edit", "delete"];

    useEffect(() => {
        fetchClasses();
    }, []);

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

    if (loading) {
        return <Loading />;
    }

    const handleEditClass = (row) => {
        setSelectedClass(row);
        setOpenEditModal(true);
    };

    const handleDeleteClass = async (classId) => {
        try {
            await deleteClass(classId);
            alert("Class deleted successfully!");
            fetchClasses();
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleUpdateClass = async (data) => {
        try {
            const updatedClass = { ...selectedClass, ...data };
            await updateClass(selectedClass.id, updatedClass);
            alert("Class updated successfully!");
            fetchClasses();
            setOpenEditModal(false);
        } catch (error) {
            console.error("Error updating class:", error);
            alert("Failed to update class. Please try again.");
        }
    };

    return (
        <div className="flex-1 transition-all duration-300 pl-0 ">
            <div className="p-6">
                <h1 className="text-3xl font-bold">Classes Management</h1>
                <AdminTable
                    rows={rows}
                    columns={columns}
                    actions={actions}
                    actionHandlers={{
                        edit: handleEditClass,
                        delete: handleDeleteClass,
                    }}
                />
            </div>

            <Modal open={openEditModal} onClose={handleCloseEditModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "800px",
                        bgcolor: "background.paper",
                        borderRadius: "12px",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedClass && (
                        <div>
                            <Typography variant="h5" gutterBottom>
                                Edit Class
                            </Typography>
                            <form onSubmit={handleSubmit(handleUpdateClass)}>
                                <TextField
                                    label="Class Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.class_name}
                                    {...register("class_name", { required: true })}
                                />
                                <TextField
                                    label="What to Learn"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.what_learn}
                                    {...register("what_learn", { required: true })}
                                />
                                <TextField
                                    label="What to Prepare"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.what_prepare}
                                    {...register("what_prepare", { required: true })}
                                />
                                <TextField
                                    label="Level"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.level}
                                    {...register("level", { required: true })}
                                />
                                <TextField
                                    label="Genre"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.genre}
                                    {...register("genre", { required: true })}
                                />
                                <TextField
                                    label="Instructor Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.instructor_username}
                                    {...register("instructor_username", { required: false })}
                                />
                                <TextField
                                    label="Session Count"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectedClass.session_count}
                                    {...register("session_count", { required: true })}
                                />
                                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Save Changes
                                </Button>
                            </form>
                        </div>
                    )}
                </Box>
            </Modal>

        </div>
    );
};

export default Classes;
