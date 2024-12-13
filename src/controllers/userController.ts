import { Request, Response } from "express";
import Bus from "../models/Bus";
import Ticket from "../models/Ticket";

// View all buses
export const viewBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ message: "Buses retrieved successfully", buses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving buses", error });
  }
};

// View available tickets
export const viewAvailableTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { busId } = req.query;
    const query = busId ? { busId, status: "available" } : { status: "available" };
    const tickets = await Ticket.find(query);
    res.status(200).json({ message: "Tickets retrieved successfully", tickets });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tickets", error });
  }
};

// // Purchase a ticket
// export const purchaseTicket = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { ticketId } = req.body;
//     const ticket = await Ticket.findById(ticketId);

//     if (!ticket) {
//       res.status(404).json({ message: "Ticket not found" });
//       return;
//     }

//     if (ticket.status === "sold") {
//       res.status(400).json({ message: "Ticket is already sold" });
//       return;
//     }

//     ticket.status = "sold";
//     ticket.userId = (req as any).user.id;
//     await ticket.save();

//     res.status(200).json({ message: "Ticket purchased successfully", ticket });
//   } catch (error) {
//     res.status(500).json({ message: "Error purchasing ticket", error });
//   }
// };

// Controller to fetch buses based on from, to, and departureTime
export const getBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { from, to, departureTime } = req.body; // Extracting from request body
    
    const query: any = {
      'schedules.from': from,
      'schedules.to': to,
    };

    // If departureTime is provided, add it to the query
    if (departureTime) {
      query['schedules.departureTime'] = departureTime;
    }

    const buses = await Bus.find(query);

    if (buses.length === 0) {
      res.status(404).json({ message: 'No buses found' });
      return;
    }

    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Booking a seat
export const bookingSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, busId, seatNumber, total } = req.body;

    console.log(req.body);

    // Check if the seat is already booked
    const existingTicket = await Ticket.findOne({ busId, seatNumber });
    if (existingTicket) {
      res.status(400).json({ message: 'Seat already booked' });
      return;
    }

    // Create a new Ticket
    const ticket = new Ticket({ userId, busId, seatNumber, total });
    await ticket.save();

    res.status(201).json({ message: 'Seat booked successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book seat', error });
  }
};

// View booked seats
export const bookedSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busId } = req.query;
    const bookedSeats = await Ticket.find({ busId, status: 'sold' });
    
    if (!bookedSeats || bookedSeats.length === 0) {
      res.status(404).json({ message: 'No booked seats found' });
      return;
    }
    
    res.status(200).json({ message: 'Booked seats retrieved successfully', bookedSeats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve booked seats', error });
  }
};
