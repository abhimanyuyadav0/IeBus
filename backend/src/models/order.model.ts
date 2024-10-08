import { Schema, model, Document } from 'mongoose';
import { IUser } from './users.model';
import { IBus } from './bus.model';

export interface IOrder extends Document {
  user: IUser['_id']; // Reference to the User
  bus: IBus['_id']; // Bus ID or name
  passengers: { name: string; contact: string }[]; // Array of passengers
  selectedSeats: number[]; // Array of selected seat IDs
  totalPrice: number; // Total price for the order
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: Schema.Types.ObjectId, ref: 'Bus', required: true }, // Adjust as needed
    passengers: [
      {
        name: { type: String, required: true },
        contact: { type: String, required: true },
      },
    ],
    selectedSeats: { type: [Number], required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IOrder>('Order', orderSchema);
