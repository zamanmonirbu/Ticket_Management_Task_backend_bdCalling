import { Request, Response } from "express";
import Bus from "../models/Bus";
import Ticket from "../models/Ticket";


export const viewBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ message: "Buses retrieved successfully", buses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving buses", error });
  }
};

export const viewAvailableTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { busId } = req.query;
    const query = busId
      ? { busId, status: "available" }
      : { status: "available" };
    const tickets = await Ticket.find(query);
    res
      .status(200)
      .json({ message: "Tickets retrieved successfully", tickets });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tickets", error });
  }
};

export const getBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { from, to, departureTime } = req.body;

    const query: any = {
      "schedules.from": from,
      "schedules.to": to,
    };
    if (departureTime) {
      query["schedules.departureTime"] = departureTime;
    }

    const buses = await Bus.find(query);

    if (buses.length === 0) {
      res.status(404).json({ message: "No buses found" });
      return;
    }

    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const bookedSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busId } = req.params;

    // Validate busId
    if (!busId) {
      res.status(400).json({ message: "Bus ID is required" });
      return;
    }

    // Get only the seat numbers to avoid sending unnecessary data
    const bookedSeats = await Ticket.find({ busId }).select('seatNumber -_id');

    res.status(200).json({ 
      message: "Booked seats retrieved successfully", 
      bookedSeats 
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve booked seats", error });
  }
};

