import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";

function authMiddleware(req, res, next) {
    try {
        const authToken = req.headers.authorization;

        if (!authToken || !authToken.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Invalid Authorization" });
        }

        const token = authToken.split(" ")[1];
        const jwtEncoded = jwt.verify(token, JWT_SECRET);
        
        req.email = jwtEncoded;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Unauthorized: Token expired" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default authMiddleware;
