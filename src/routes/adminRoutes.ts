import express from 'express';
import { addBus, updateBus, deleteBus, addTicket, updateTicket, deleteTicket } from '../controllers/adminController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Bus routes
router.post('/bus', protect, addBus);
router.put('/bus/:id', protect, updateBus);
router.delete('/bus/:id', protect, deleteBus);

// Ticket routes
router.post('/ticket', protect, addTicket);
router.put('/ticket/:id', protect, updateTicket);
router.delete('/ticket/:id', protect, deleteTicket);

export default router;
