import { Request, Response } from 'express';
import Booking, { IBooking } from '../models/Booking';
import Bus from '../models/Bus';
import Schedule from '../models/Schedule';
import User from '../models/User'; // Assuming you have a User model

// Add a new booking
export const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, seatNumber, busId, scheduleId, paymentStatus, total } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the bus exists
    const bus = await Bus.findById(busId);
    if (!bus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }

    // Check if the schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      res.status(404).json({ message: 'Schedule not found' });
      return;
    }

    // Create the booking
    const newBooking: IBooking = await Booking.create({
      userId,
      seatNumber,
      busId,
      scheduleId,
      paymentStatus,
      total
    });

    res.status(201).json({ message: 'Booking created successfully', newBooking });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creating booking', error });
  }
};
