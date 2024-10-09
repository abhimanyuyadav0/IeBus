import Location, { ILocation } from '../models/location.model';

export const getAllLocations = async (): Promise<ILocation[]> => {
  return await Location.find().exec();
};

export const createLocation = async (name: string): Promise<ILocation> => {
  const location = new Location({ name });
  return await location.save();
};
