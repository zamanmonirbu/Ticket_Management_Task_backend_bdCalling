import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { VerifyErrors, JwtPayload } from 'jsonwebtoken';


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user: IUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error occurred while registering user' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Check if user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate Access Token (short lifespan, e.g., 15m)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '55m' }
    );

    // Generate Refresh Token (long lifespan, e.g., 7 days)
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.REFRESH_SECRET!, 
      { expiresIn: '7d' }
    );

    const userResponse = { id: user._id, name: user.name, role: user.role };

    // Send both tokens in the response
    res.status(200).json({ 
      message: 'Login successful', 
      user: userResponse,
      accessToken,
      refreshToken 
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error occurred while logging in' });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  try {
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Server error occurred while logging out' });
  }
};




export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(401).json({ message: 'Refresh token is required' });
      return;
    }

    jwt.verify(
      token, 
      process.env.REFRESH_SECRET!, 
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          res.status(403).json({ message: 'Invalid refresh token' });
          return;
        }

        const { id, role } = (decoded as JwtPayload) || {};

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { id, role }, 
          process.env.JWT_SECRET!, 
          { expiresIn: '15m' }
        );

        res.status(200).json({ 
          message: 'Access token refreshed successfully', 
          accessToken: newAccessToken 
        });
      }
    );
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Server error occurred while refreshing token' });
  }
};

