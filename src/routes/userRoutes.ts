import express from "express";
import {
  viewBuses,
  viewAvailableTickets,
  getBuses,
  bookedSeat,
} from "../controllers/userController";
import { addTicket } from "../controllers/adminController";


const router = express.Router();

router.get("/buses", viewBuses);
router.get("/tickets", viewAvailableTickets);
router.post("/bus/search", getBuses);
router.get("/booked-seats/:busId", bookedSeat);
router.post("/book-seat", addTicket);

export default router;
