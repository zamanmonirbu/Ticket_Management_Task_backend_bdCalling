import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId;
  seatNumber: number;
  mobile: string;
  busId: mongoose.Types.ObjectId;
  paymentStatus: "Pending" | "Paid" | "Failed";
  total: number;
}
const TicketSchema: Schema = new Schema<ITicket>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seatNumber: { type: Number, required: true, min: 1 },
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    total: { type: Number, required: true, min: 0 },
    mobile: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);
