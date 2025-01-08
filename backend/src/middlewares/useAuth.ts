import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import User from "../models/users";

export default async function useAuth(req : Request, res : Response, next : NextFunction): Promise<any> {
    const root = req.cookies?.root || (req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);
    if (!root) {
        return res.status(400).json({ err_msg : "Please provide a token" })
    }
    try {
        const verifyToken = jwt.verify(root, "test123") as JwtPayload
        if (!verifyToken) {
            return res.status(400).json({ err_msg : "Invalid token" });
        }
        const user = await User.findOne({ user_id : verifyToken?.user_id })
        if (!user) {
            return res.status(404).json({ err_msg : "User not found" });
        }
        req.userid = user.user_id;
        next();
    } catch (err : any) {
        console.log(err.message);
        res.status(500).json({err_msg : "Internal server error"})
    }
}