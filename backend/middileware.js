import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";


function authMiddleware(req, res, next){
    try {
        const authToken = req.headers.authorization
    
        if(!authToken || !authToken.startsWith("Bearer")){
            return res.status(400).json("Invalid Authorization")
        }

        const token = authToken.split(" ")[1]
        try {
            const jwtEncoded = jwt.verify(token, JWT_SECRET)
            req.email = jwtEncoded
        } catch (error) {
            res.status(500).json(error.message)
        }
        next()
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export default authMiddleware;