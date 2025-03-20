import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
dotenv.config();
const authUser = async (
  req: Request & { headers: { token?: string }; body: { userId?: string } },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.headers;

  if (!token) {
    res.status(401).json({ success: false, messege: 'Unauthorized user' });
    return;
  }
  
  try {
    const decode_token = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    req.body.userId = decode_token.id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};


export default authUser;