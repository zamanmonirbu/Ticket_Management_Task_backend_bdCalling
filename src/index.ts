import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: '*', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.options('*', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', 'https://ticket-management-task-frontend-bd-calling.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('DB connection error', error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
