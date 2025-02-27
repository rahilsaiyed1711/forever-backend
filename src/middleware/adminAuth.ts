import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['authorization']; // Extract token from Authorization header
    if (!token) {
        return res.status(404).json({ msg: "Token not found" });
    }
    try {
        const token_decode = JWT.verify(token, process.env.SECRET_KEY as string);
        if(token_decode !== process.env.ADMIN_EMAIL as string + process.env.ADMIN_PASSWORD as string){
            return res.status(403).json({msg:"Admin Not Authorized"});
        }
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

export default adminAuth;