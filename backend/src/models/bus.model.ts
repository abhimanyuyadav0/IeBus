import { Schema, model, Document } from 'mongoose';

export interface IBus extends Document {
  name: string;
  departure: string;
  arrival: string;
  price: string;
  from: string;
  to: string;
  stops: string[];
}

const busSchema = new Schema<IBus>(
  {
    name: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    price: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    stops: { type: [String], required: true }, // Array of stop names
  },
  { timestamps: true }
);

export default model<IBus>('Bus', busSchema);
