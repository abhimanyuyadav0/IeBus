import { Request, Response, NextFunction } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../services/order.service';

export const createNewOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, product, price } = req.body;
    
    // Check if required fields are provided
    if (!user || !product || !price) {
      return res.status(400).json({ message: 'User, product, and price are required fields.' });
    }

    // Create a new order
    const orderData = { user, product, price };
    const newOrder = await createOrder(orderData);
    
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all orders and populate the user field
    const orders = await getAllOrders();
    res.status(200).json({ message: 'Orders retrieved successfully', orders });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch order by ID and populate the user field
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order retrieved successfully', order });
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Update order details
    const updatedOrder = await updateOrder(req.params.id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Delete order by ID
    const result = await deleteOrder(req.params.id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
