import {Request, Response, NextFunction} from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
} from '../services/order.service';

export const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {user, bus, passengers, selectedSeats, totalPrice} = req.body;

    if (!user || !bus || !passengers || !selectedSeats || !totalPrice) {
      return res.status(400).json({message: 'All fields are required.'});
    }

    const orderData = {
      user,
      bus,
      passengers,
      selectedSeats,
      totalPrice,
    };

    const newOrder = await createOrder(orderData);
    res
      .status(201)
      .json({message: 'Order created successfully', order: newOrder});
  } catch (error) {
    next(error);
  }
};

export const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId: any = req.params.id;
    const order = await getAllOrders(userId);
    if (!order) {
      return res.status(404).json({message: 'Order not found'});
    }
    res.status(200).json({message: 'Order retrieved successfully', order});
  } catch (error) {
    next(error);
  }
};

export const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await deleteOrder(req.params.id);
    res.status(200).json({message: result});
  } catch (error) {
    next(error);
  }
};
