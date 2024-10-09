import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
}
export interface ISeat extends Document { 
  seatName: string;
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
  seats: ISeat[]; 
}

const seatSchema = new Schema<ISeat>({
  seatName: { type: String, required: true },
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
    stops: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    seats: [seatSchema],
  },
  { timestamps: true }
);

export default model<IBus>('Bus', busSchema);
