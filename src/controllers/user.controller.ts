import { Request, Response } from 'express';
import User from '../models/user.model';
import Admin from '../models/admin.model';
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
      res.status(409).json({ msg: 'user already existes' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const user = newUser.save();
    res.status(200).json({ msg: 'created' });
    return res.redirect('/api/users/login');
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
    res.status(500).json({ msg: 'eroor ' });
  }
};

//admin login route
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(409).json({ msg: 'User Does not exists' });
    }
    // const isMatched = await bcrypt.compare(password, user.password);
    if (password === user.password) {
      const token = JWT.sign(
          user.email + user.password,
        process.env.SECRET_KEY as string);
      res.cookie('adminCookie', token);
      res.status(200).json({ token, email });
    } else {
      res.status(409).json({ msg: 'Password Incorrect' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'error occurred' });
  }
};
