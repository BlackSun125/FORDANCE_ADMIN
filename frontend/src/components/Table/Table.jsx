import React, { useState, useEffect, useRef } from "react";
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
import { Edit, Delete, Check, Close } from "@mui/icons-material";

const AdminTable = ({ rows, columns, actions, actionHandlers }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [maxHeight, setMaxHeight] = useState(500); // Giá trị mặc định
    const containerRef = useRef(null);

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

    const getActionsForStatus = (status) => {
        if (status === "waiting") {
            return ["edit", "approve", "reject"];
        }
        return ["edit", "delete"];
    };

    const filteredRows = rows.filter((row) =>
        columns.some((column) => {
            const cellValue = row[column.field]?.toString().toLowerCase();
            return cellValue?.includes(searchQuery);
        })
    );

    useEffect(() => {
        const updateMaxHeight = () => {
            if (containerRef.current) {
                // Tính chiều cao khả dụng dựa trên viewport và phần tử chứa
                const availableHeight =
                    window.innerHeight - containerRef.current.getBoundingClientRect().top - 20; // Trừ đi khoảng cách và padding
                setMaxHeight(availableHeight > 300 ? availableHeight : 300); // Đảm bảo chiều cao tối thiểu là 300px
            }
        };

        updateMaxHeight();
        window.addEventListener("resize", updateMaxHeight); // Cập nhật khi thay đổi kích thước cửa sổ
        return () => window.removeEventListener("resize", updateMaxHeight);
    }, []);

    return (
        <Paper ref={containerRef} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleSearchChange}
            />
            <TableContainer
                style={{
                    maxHeight: `${maxHeight}px`, // Sử dụng maxHeight tính toán được
                    overflowY: "auto",
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
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
                                    <TableCell>
                                        {getActionsForStatus(row.status).map((action) => {
                                            let IconComponent;

                                            switch (action) {
                                                case "edit":
                                                    IconComponent = <Edit />;
                                                    break;
                                                case "delete":
                                                    IconComponent = <Delete />;
                                                    break;
                                                case "approve":
                                                    IconComponent = <Check />;
                                                    break;
                                                case "reject":
                                                    IconComponent = <Close />;
                                                    break;
                                                default:
                                                    return null;
                                            }

                                            return (
                                                <IconButton
                                                    key={action}
                                                    onClick={() =>
                                                        actionHandlers?.[action]?.(row) ??
                                                        console.warn(`No handler for action: ${action}`)
                                                    }
                                                >
                                                    {IconComponent}
                                                </IconButton>
                                            );
                                        })}
                                    </TableCell>
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
