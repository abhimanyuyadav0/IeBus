import Order, { IOrder } from '../models/order.model';

export const createOrder = async (data: any): Promise<IOrder> => {
  const order: IOrder = new Order(data);
  return await order.save();
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await Order.find().populate('user').exec();
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id).populate('user').exec();
};

export const updateOrder = async (id: string, data: any): Promise<IOrder | null> => {
  const order = await Order.findById(id);
  if (!order) {
    return null;
  }
  order.set(data);
  return await order.save();
};

export const deleteOrder = async (id: string): Promise<string> => {
  await Order.findByIdAndDelete(id);
  return 'Order deleted';
};
