// authMiddleware.js
const supabase = require('../config/supabase');

const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const { data, error } = await supabase.auth.api.getUser(token);

        if (error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Thêm thông tin người dùng vào req.user
        req.user = data;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { authenticate };