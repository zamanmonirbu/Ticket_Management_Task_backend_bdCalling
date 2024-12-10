import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  busId: mongoose.Types.ObjectId;
  price: number;
  timeSlot: Date;
  userId?: mongoose.Types.ObjectId;
  status: 'available' | 'sold';
}

const TicketSchema: Schema = new Schema<ITicket>({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  price: { type: Number, required: true },
  timeSlot: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'sold'], default: 'available' }
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);
