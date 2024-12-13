  // src/models/Bus.ts
  import mongoose, { Document, Schema } from 'mongoose';

  export interface ISchedule {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
  }

  export interface IBus extends Document {
    name: string;
    totalSeats: number;
    schedules: ISchedule[]; // Embedded array of schedules
  }

  const ScheduleSchema: Schema = new Schema<ISchedule>({
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
  });

  const BusSchema: Schema = new Schema<IBus>({
    name: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    schedules: [ScheduleSchema], // Embedded schedule schema inside the Bus schema
  });

  export default mongoose.model<IBus>('Bus', BusSchema);
