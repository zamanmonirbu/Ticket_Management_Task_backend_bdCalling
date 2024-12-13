import express from 'express';
import { viewBuses, viewAvailableTickets, getBuses, bookingSeat, bookedSeat } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/buses', viewBuses);
// router.post('/bus/search', getBusesByScheduleParams);
router.get('/tickets', viewAvailableTickets);
// router.post('/tickets/purchase', protect, purchaseTicket);
router.post('/bus/search', getBuses);
router.get('/booked-seats/:busId', bookedSeat);
router.post('/book-seat', bookingSeat);





export default router;
