import React, { useState } from "react";
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
    TextField,
} from "@mui/material";
import { Edit, Delete, Lock, Check, Close } from "@mui/icons-material";
import "./Table.css";

const AdminTable = ({ rows, columns, actions }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setPage(0);
    };

    const filteredRows = rows.filter((row) =>
        columns.some((column) => {
            const cellValue = row[column.field]?.toString().toLowerCase();
            return cellValue?.includes(searchQuery);
        })
    );

    return (
        <Paper>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleSearchChange}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow className="header-row">
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                            {actions && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
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
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AdminTable;
