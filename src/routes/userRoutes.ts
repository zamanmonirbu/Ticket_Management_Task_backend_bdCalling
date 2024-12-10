import express from 'express';
import { viewBuses, viewAvailableTickets, purchaseTicket } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/buses', protect, viewBuses);
router.get('/tickets', protect, viewAvailableTickets);
router.post('/tickets/purchase', protect, purchaseTicket);

export default router;
