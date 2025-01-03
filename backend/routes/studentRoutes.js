const express = require("express");
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
} = require("../controllers/studentController");
const router = express.Router();

// Route lấy danh sách sinh viên
router.get("/", getAllStudents);

// Lấy session theo ID
router.get('/:id', getStudentById);

// Tạo session mới
router.post('/', createStudent);

// Cập nhật session
router.put('/:id', updateStudent);

router.delete('/:id', deleteStudent);

module.exports = router;
