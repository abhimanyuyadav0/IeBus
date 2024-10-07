import User, { IUser } from '../models/users.model';

export const createUser = async (data: any): Promise<IUser> => {
   const user: IUser = new User(data);
   return await user.save();
};

interface PaginationData {
   count: number;
}

interface NopaginatedData {
   count: number;
}
interface PaginatedUsers extends PaginationData {
   users: IUser[];
}

export const getAllUsers = async (): Promise<PaginatedUsers | IUser[]> => {
   const query: any = {};

   const count = await User.countDocuments();
   if (count) {
      const users = await User.find(query).exec();
      return {
         count,
         users: users,
      };
   } else {
      const users = await User.find(query).exec();
      const data = {
         count: count,
         users: users
      }
      return data;
   }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
   return await User.findById(id).exec();
};

export const getUserByIdV2 = async (id: string): Promise<IUser | null> => {
   return await User.findById(id);
};

export const getUserByEmail = async (email?: string): Promise<IUser | null> => {
   if (!email) {
      return null;
   }
   return await User.findOne({ 'email': email }).exec();
};

export const updateUser = async (id: string, data: any): Promise<IUser | null> => {
   const user = await User.findById(id);
   if (!user) {
      return null;
   }
   user.set(data);
   return await user.save();
};

export const deleteUser = async (id: string): Promise<IUser | any> => {
   await User.findByIdAndDelete(id);
   return "User deleted"
};