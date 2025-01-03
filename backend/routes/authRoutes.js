// routes/authRoutes.js
const express = require("express");
const { login, logout } = require("../controllers/authController");

const router = express.Router();

// Định nghĩa route cho đăng nhập
router.post("/login", login);

// Định nghĩa route cho đăng xuất
router.post("/logout", logout);

module.exports = router;
