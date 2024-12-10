import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' }); 
    return; // Ensure that the function stops execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next(); // Call next without returning a value
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
    return; // Ensure that the function stops execution
  }
};
