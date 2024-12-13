// src/models/Schedule.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISchedule extends Document {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
}

const ScheduleSchema: Schema = new Schema<ISchedule>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
