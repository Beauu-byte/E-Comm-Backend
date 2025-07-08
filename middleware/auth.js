const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Split out the Bearer part if present
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = auth;