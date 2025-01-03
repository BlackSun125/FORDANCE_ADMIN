const express = require("express");
const { getAllStudents } = require("../controllers/studentController");
const router = express.Router();

// Route lấy danh sách sinh viên
router.get("/", getAllStudents);

module.exports = router;
