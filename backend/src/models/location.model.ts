import { Schema, model, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
}

const locationSchema = new Schema<ILocation>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model<ILocation>('Location', locationSchema);
