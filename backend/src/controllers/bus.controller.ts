import { Request, Response, NextFunction } from 'express';
import { createBus, getAllBuses, getBusById, updateBus, deleteBus } from '../services/bus.service';

export const createNewBus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, departure, arrival, price, from, to, stops } = req.body;
    
    // Validate required fields
    if (!name || !departure || !arrival || !price || !from || !to) {
      return res.status(400).json({ message: 'All fields are required except stops.' });
    }

    const busData = { name, departure, arrival, price, from, to, stops: stops || [] };
    const newBus = await createBus(busData);

    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
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
