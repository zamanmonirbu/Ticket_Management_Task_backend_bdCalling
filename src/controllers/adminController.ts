import { Request, Response } from 'express';
import Bus, { IBus } from '../models/Bus';
import Schedule from '../models/Schedule'; 
import Ticket, { ITicket } from '../models/Ticket';


// Add a new bus
export const addBus = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure the necessary fields from the request body
    const { name, totalSeats, schedules }: IBus = req.body;

    // Validate required fields
    if (!name || !totalSeats || !schedules || schedules.length === 0) {
      res.status(400).json({ message: "Name, totalSeats, and schedules are required." });
      return; // Ensure the function ends here after sending a response
    }

    // Create a new bus instance with the provided data
    const newBus = new Bus({
      name,
      totalSeats,
      schedules,
    });

    // Save the new bus to the database
    await newBus.save();

    // Respond with a success message and the newly created bus
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding bus", error });
  }
};

// Add a ticket for a specific bus schedule
export const addTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busId, price, timeSlot, route } = req.body; // Time slot and route are now explicitly required
    const bus = await Bus.findById(busId).populate('schedules'); // Populate schedules with actual data
    
    if (!bus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }

    // Check if the time and route exist in the bus schedules
    const scheduleExists = bus.schedules.some(
      (schedule) => schedule.departureTime === timeSlot && schedule.from === route.from && schedule.to === route.to
    );

    if (!scheduleExists) {
      res.status(400).json({ message: 'No matching schedule found for the given time and route' });
      return;
    }

    const newTicket: ITicket = await Ticket.create({ busId, price, timeSlot, route });
    res.status(201).json({ message: 'Ticket created successfully', newTicket });
  } catch (error) {
    res.status(400).json({ message: 'Error adding ticket', error });
  }
};


// Update bus details (like name, totalSeats, or schedules)
export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.status(200).json({ message: 'Bus updated successfully', updatedBus });
  } catch (error) {
    res.status(400).json({ message: 'Error updating bus', error });
  }
};

// Delete a bus by its ID
export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting bus', error });
  }
};


// Update ticket details
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTicket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    res.status(200).json({ message: 'Ticket updated successfully', updatedTicket });
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket', error });
  }
};


export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      res.status(404).json({ message: 'Ticket not found' });
      return; // Ensure no further execution
    }
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ticket', error });
  }
};
