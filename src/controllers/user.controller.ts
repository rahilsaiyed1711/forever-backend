import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
dotenv.config();
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      res.status(409).json({ msg: 'user already exists' });
      return; // Prevent further execution
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save(); 
     console.log(user);
    res.status(200).json({ msg: 'created' });
  } catch (error) {
    res.status(500).json({ error: 'error creating user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found, please sign up' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'incorrect Password' });
    }
    const token = JWT.sign(
      { email: user.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );
    res.cookie('jwt', token);
    console.log(token);
    res.json({ token, email });
  } catch (err) {
    res.status(500).json({ msg: 'error' });
  }
};

//admin login route
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = JWT.sign(email + password, process.env.SECRET_KEY as string);
        res.json({ success: true, token })
    } else {
        res.json({ success: false, massage: "Invalid credentials" })
    }
} catch (error) {
    console.log(error);
    res.json({ success: false, message:"error" })
}
};