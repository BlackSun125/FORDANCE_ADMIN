import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
} from "@mui/material";
import { Edit, Delete, Lock, Check, Close } from "@mui/icons-material";

const AdminTable = ({ rows, columns, actions }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                            {actions && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>{row[column.field]}</TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell>
                                            {actions.includes("edit") && (
                                                <IconButton onClick={() => console.log("Edit", row)}>
                                                    <Edit />
                                                </IconButton>
                                            )}
                                            {actions.includes("delete") && (
                                                <IconButton onClick={() => console.log("Delete", row)}>
                                                    <Delete />
                                                </IconButton>
                                            )}
                                            {actions.includes("lock") && (
                                                <IconButton onClick={() => console.log("Lock", row)}>
                                                    <Lock />
                                                </IconButton>
                                            )}
                                            {actions.includes("approve") && (
                                                <IconButton onClick={() => console.log("Approve", row)}>
                                                    <Check />
                                                </IconButton>
                                            )}
                                            {actions.includes("reject") && (
                                                <IconButton onClick={() => console.log("Reject", row)}>
                                                    <Close />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AdminTable;

// Usage example
// const columns = [
//   { field: "no", headerName: "No" },
//   { field: "name", headerName: "Name" },
//   { field: "email", headerName: "Email" },
//   { field: "phone", headerName: "Phone" },
//   { field: "classes", headerName: "Classes" },
//   { field: "sessions", headerName: "Sessions" },
//   { field: "feesPaid", headerName: "Fees Paid" },
// ];

// const rows = [
//   { no: 1, name: "Brad Simmons", email: "abc@gmail.com", phone: "+84 12345678", classes: "Class 1, Class 2", sessions: "Session 1, Session 2", feesPaid: 342048 },
//   // Add more rows as needed
// ];

// const actions = ["edit", "delete", "lock"];

// <AdminTable rows={rows} columns={columns} actions={actions} />;
