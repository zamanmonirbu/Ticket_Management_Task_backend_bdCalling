import { Request, Response } from 'express';
import Bus, { IBus } from '../models/Bus';
import Ticket, { ITicket } from '../models/Ticket';


export const addBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, route, totalSeats } = req.body;
    const newBus: IBus = await Bus.create({ name, route, totalSeats, createdBy: (req as any).user.id });
    res.status(201).json({ message: 'Bus created successfully', newBus });
  } catch (error) {
    res.status(400).json({ message: 'Error adding bus', error });
  }
};

export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return; // Ensures no further execution
    }
    res.status(200).json({ message: 'Bus updated successfully', updatedBus });
  } catch (error) {
    res.status(400).json({ message: 'Error updating bus', error });
  }
};

export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return; // Ensures no further execution
    }
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting bus', error });
  }
};


export const addTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busId, price, timeSlot } = req.body;
    const newTicket: ITicket = await Ticket.create({ busId, price, timeSlot });
    res.status(201).json({ message: 'Ticket created successfully', newTicket });
  } catch (error) {
    res.status(400).json({ message: 'Error adding ticket', error });
  }
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTicket) {
      res.status(404).json({ message: 'Ticket not found' });
      return; // Ensure no further execution
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
