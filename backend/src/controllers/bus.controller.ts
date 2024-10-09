import { Request, Response, NextFunction } from 'express';
import { createBus, getAllBuses, getBusById, updateBus, deleteBus, bookSeats } from '../services/bus.service';

export const createNewBus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, departure, arrival, price, from, to, stops = [], seats } = req.body;

    if (!name || !departure || !arrival || !price || !from || !to || !seats) {
      return res.status(400).json({ message: 'All fields are required, including seats.' });
    }

    const busData = { name, departure, arrival, price, from, to, stops, seats };
    const newBus = await createBus(busData);

    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (error) {
    next(error);
  }
};

export const bookBusSeats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { seatIds } = req.body;
    const busId = req.params.id;

    if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ message: 'Please provide seat IDs to book.' });
    }

    const updatedBus = await bookSeats(busId, seatIds);
    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found or seats unavailable.' });
    }

    res.status(200).json({ message: 'Seats booked successfully', bus: updatedBus });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buses = await getAllBuses();
    res.status(200).json({ message: 'Buses retrieved successfully', buses });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bus = await getBusById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus retrieved successfully', bus });
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBus = await updateBus(req.params.id, req.body);
    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteBus(req.params.id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
