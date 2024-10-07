import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
   firstName: string;
   lastName: string;
   email: string;
   mobile: string;
   profileImg: string;
   password: string;
}

const userSchema = new Schema<IUser>(
   {
      firstName: { type: String, },
      lastName: { type: String, },
      email: { type: String, },
      mobile: { type: String, },
      profileImg: { type: String, },
      password: { type: String },
   },
   { timestamps: true }
);

export default model<IUser>('User', userSchema);
