import Location, { ILocation } from '../models/location.model';

// Get all locations
export const getAllLocations = async (): Promise<ILocation[]> => {
  return await Location.find().exec();
};

// Add a new location
export const createLocation = async (name: string): Promise<ILocation> => {
  const location = new Location({ name });
  return await location.save();
};
