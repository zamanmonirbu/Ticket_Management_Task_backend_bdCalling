import { Request, Response } from "express";
import Bus, { IBus } from "../models/Bus";
import Ticket, { ITicket } from "../models/Ticket";
import User from "../models/User";


export const addBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, totalSeats, schedules }: IBus = req.body;
    if (!name || !totalSeats || !schedules || schedules.length === 0) {
      res
        .status(400)
        .json({ message: "Name, totalSeats, and schedules are required." });
      return;
    }
    const newBus = new Bus({
      name,
      totalSeats,
      schedules,
    });
    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding bus", error });
  }
};

export const getBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const allBuses = await Bus.find({});
    res
      .status(200)
      .json({ message: "Buses found successfully", buses: allBuses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding buses", error });
  }
};



export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBus) {
      res.status(404).json({ message: "Bus not found" });
      return;
    }
    res.status(200).json({ message: "Bus updated successfully", updatedBus });
  } catch (error) {
    res.status(400).json({ message: "Error updating bus", error });
  }
};

export const getSpecificBus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const foundBus = await Bus.findById({ _id: id });
    if (!foundBus) {
      res.status(404).json({ message: "Bus not found" });
      return;
    }
    res.status(200).json({ message: "Bus found successfully", foundBus });
  } catch (error) {
    // console.log(error)
    res.status(400).json({ message: "Error updating bus", error });
  }
};

export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      res.status(404).json({ message: "Bus not found" });
      return;
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting bus", error });
  }
};




export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTickets = await Ticket.find({}).sort({createdAt:-1});
    res
      .status(200)
      .json({ message: "Buses found successfully", buses: allTickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding buses", error });
  }
};


export const getTicketsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const foundTicket = await Ticket.findOne({ userId: id }).populate("busId"); 
    if (!foundTicket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json({ message: "Ticket found successfully", foundTicket });
  } catch (error) {
    res.status(400).json({ message: "Error fetching ticket", error });
  }
};


export const addTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, userMobile, seats, totalPrice, paymentStatus } = req.body;

    if (!seats || seats.length === 0) {
      res.status(400).json({ message: "No seats selected for booking." });
      return;
    }

    const tickets = await Promise.all(seats.map(async (seat: { seatNumber: number, price: number, busId: string }) => {
      const bus = await Bus.findById(seat.busId);

      if (!bus) {
        throw new Error(`Bus with ID ${seat.busId} not found`);
      }

      return Ticket.create({
        userId,
        mobile: userMobile,
        seatNumber: seat.seatNumber,
        busId: seat.busId,
        paymentStatus,
        total: seat.price, 
      });
    }));

    res.status(201).json({ message: "Tickets booked successfully", tickets, totalPrice });
  } catch (error) {
    // console.log(error)
    res.status(400).json({ message: "Error booking tickets", error   });
  }
};

  
export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTicket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Ticket updated successfully", updatedTicket });
  } catch (error) {
    res.status(400).json({ message: "Error updating ticket", error });
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting ticket", error });
  }
};


// Fetch all users
export const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ users }); // No need for `return`
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Update user status (activate or deactivate)
export const updateUserStatus = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { name, email, password, address, mobile, role, status } = req.body; // Extract body data

  try {
    const updatedData: any = { name, email, address, mobile, role, status };

    // If the password is being updated, hash it (optional, if applicable)
    if (password) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData }, // Update only provided fields
      { new: true, runValidators: true } // Return the updated user
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete({_id:userId});
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
