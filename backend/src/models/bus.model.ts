import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
}

export interface IBus extends Document {
  name: string;
  departure: string;
  arrival: string;
  price: string;
  from: ILocation | string; // Reference to ILocation
  to: ILocation | string; // Reference to ILocation
  stops: ILocation[] | string[]; // Array of references to ILocation
}

const busSchema = new Schema<IBus>(
  {
    name: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    price: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // Reference to Location
    to: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // Reference to Location
    stops: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }], // Array of references to Location
  },
  { timestamps: true }
);

export default model<IBus>('Bus', busSchema);
