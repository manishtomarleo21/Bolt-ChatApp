import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: "Unauthorize: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorize: Invalid token" });
        }

        //if gets error in login can change decoded.userId 
        const user = await User.findById(decoded.id).select("-password"); 
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({ message: "Something went wrong" });
        
    }
}