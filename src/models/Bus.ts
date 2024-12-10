import mongoose, { Document, Schema } from 'mongoose';

export interface IBus extends Document {
  name: string;
  route: string;
  totalSeats: number;
  createdBy: mongoose.Types.ObjectId;
}

const BusSchema: Schema = new Schema<IBus>({
  name: { type: String, required: true },
  route: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IBus>('Bus', BusSchema);
