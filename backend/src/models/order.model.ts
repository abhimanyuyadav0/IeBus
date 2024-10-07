import { Document, model, Schema } from 'mongoose';
import { IUser } from './users.model';

export interface IOrder extends Document {
  user: IUser['_id'];
  product: string;
  price: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default model<IOrder>('Order', orderSchema);
