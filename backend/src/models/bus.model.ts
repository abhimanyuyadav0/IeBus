import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
}

export interface ISeat {
  id: number;
  price: number;
  booked: boolean;
}

export interface IBus extends Document {
  name: string;
  departure: string;
  arrival: string;
  price: string;
  from: ILocation | string; 
  to: ILocation | string; 
  stops: ILocation[] | string[]; 
  seats: ISeat[]; // Seats array added here
}

const seatSchema = new Schema<ISeat>({
  id: { type: Number, required: true },
  price: { type: Number, required: true },
  booked: { type: Boolean, default: false },
});

const busSchema = new Schema<IBus>(
  {
    name: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    price: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    stops: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }],
    seats: [seatSchema], // Seats added to bus schema
  },
  { timestamps: true }
);

export default model<IBus>('Bus', busSchema);
