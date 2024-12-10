import { Request, Response } from 'express';
import Bus from '../models/Bus';
import Ticket from '../models/Ticket';

// View all buses
export const viewBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ message: 'Buses retrieved successfully', buses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving buses', error });
  }
};

// View available tickets
export const viewAvailableTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busId } = req.query;
    const query = busId ? { busId, status: 'available' } : { status: 'available' };
    const tickets = await Ticket.find(query);
    res.status(200).json({ message: 'Tickets retrieved successfully', tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tickets', error });
  }
};


// Purchase a ticket
export const purchaseTicket = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ticketId } = req.body;
      const ticket = await Ticket.findById(ticketId);
      
      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });  // No return here
        return;  // End the function execution
      }
      
      if (ticket.status === 'sold') {
        res.status(400).json({ message: 'Ticket is already sold' });  // No return here
        return;  // End the function execution
      }
  
      ticket.status = 'sold';
      ticket.userId = (req as any).user.id;
      await ticket.save();
  
      res.status(200).json({ message: 'Ticket purchased successfully', ticket });  // No return here
    } catch (error) {
      res.status(500).json({ message: 'Error purchasing ticket', error });
    }
  };
  