import { Request, Response, NextFunction } from 'express';
import { getAllLocations, createLocation } from '../services/location.service';

export const fetchLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await getAllLocations();
    res.status(200).json({ locations });
  } catch (error) {
    next(error);
  }
};

export const addLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Location name is required' });
    }

    const newLocation = await createLocation(name);
    res.status(201).json({ location: newLocation });
  } catch (error) {
    next(error);
  }
};
