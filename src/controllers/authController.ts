import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user }); // No need to return here
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error }); // No need to return here
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // No need to return here
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' }); // No need to return here
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token }); // No need to return here
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error }); // No need to return here
  }
};


// Logout user (invalidate token on the client-side)
export const logoutUser = (req: Request, res: Response): void => {
  try {
    // Optionally, you can clear the JWT token stored in cookies (if used).
    res.clearCookie('token');  // If you're using a cookie to store the token
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};
