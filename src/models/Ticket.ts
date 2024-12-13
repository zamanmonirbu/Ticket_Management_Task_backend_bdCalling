import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User
  seatNumber: number;
  busId: mongoose.Types.ObjectId; // Reference to Bus
  paymentStatus: 'Pending' | 'Paid' | 'Failed'; // Payment status
  total: number; // Total price of the booking
}

const TicketSchema: Schema = new Schema<ITicket>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    seatNumber: { type: Number, required: true, min: 1 }, // Seat number (must be >= 1)
    busId: { type: Schema.Types.ObjectId, ref: 'Bus', required: true }, // Reference to Bus model
    paymentStatus: { 
      type: String, 
      required: true, 
      enum: ['Pending', 'Paid', 'Failed'], 
      default: 'Pending' 
    },
    total: { type: Number, required: true, min: 0 }, // Total price of the booking (must be >= 0)
  }, 
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

export default mongoose.model<ITicket>('Ticket', TicketSchema);
