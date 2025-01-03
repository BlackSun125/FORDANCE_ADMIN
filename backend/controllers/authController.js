// controllers/authController.js
const supabase = require("../config/supabase");

// Đăng nhập
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ message: error.message });
        }

        // Trả về token hoặc thông tin người dùng
        const { user, access_token } = data;
        return res.status(200).json({
            message: "Login successful",
            user: user,
            token: access_token, // Gửi token cho client
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Đăng xuất
const logout = async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const { error } = await supabase.auth.api.signOut(token);

        if (error) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { login, logout };
