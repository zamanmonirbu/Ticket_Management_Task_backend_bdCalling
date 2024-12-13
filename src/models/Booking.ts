import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User
  seatNumber: number;
  busId: mongoose.Types.ObjectId; // Reference to Bus
  paymentStatus: string; // Payment status (e.g., 'Pending', 'Paid', 'Failed')
  total: number; // Total price of the booking
}

const BookingSchema: Schema = new Schema<IBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  seatNumber: { type: Number, required: true }, // Seat number
  busId: { type: Schema.Types.ObjectId, ref: 'Bus', required: true }, // Reference to Bus model
  paymentStatus: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Paid', 'Failed'], // Ensures valid payment status
    default: 'Pending' 
  },
  total: { type: Number, required: true }, // Total cost of the booking
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
