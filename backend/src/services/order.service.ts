import Order, { IOrder } from '../models/order.model'; 

export const createOrder = async (data: any): Promise<IOrder> => {
  const order = new Order(data);
  return await order.save();
};

export const getAllOrders = async (userId: string): Promise<IOrder[]> => {
  return await Order.find({ user: userId }).populate('bus').exec(); 
};

export const deleteOrder = async (id: string): Promise<string> => {
  await Order.findByIdAndDelete(id);
  return 'Order deleted';
};
