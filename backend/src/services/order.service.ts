import Order, { IOrder } from '../models/order.model'; 

export const createOrder = async (data: any): Promise<IOrder> => {
  const order = new Order(data);
  return await order.save();
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id).populate('bus').exec(); 
};

// Delete an order by ID
export const deleteOrder = async (id: string): Promise<string> => {
  await Order.findByIdAndDelete(id);
  return 'Order deleted';
};
