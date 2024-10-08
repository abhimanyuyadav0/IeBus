import Bus, { IBus } from '../models/bus.model';

export const createBus = async (data: any): Promise<IBus> => {
  const bus = new Bus(data);
  return await bus.save();
};

export const getAllBuses = async (): Promise<IBus[]> => {
  return await Bus.find().populate('from to stops').exec(); // Populate location details
};

export const getBusById = async (id: string): Promise<IBus | null> => {
  return await Bus.findById(id).populate('from to stops').exec();
};

export const updateBus = async (id: string, data: any): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }
  bus.set(data);
  return await bus.save();
};

export const deleteBus = async (id: string): Promise<string> => {
  await Bus.findByIdAndDelete(id);
  return 'Bus deleted';
};

export const bookSeats = async (id: string, seatIds: number[]): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }
  
  bus.seats = bus.seats.map(seat =>
    seatIds.includes(seat.id) ? { ...seat, booked: true } : seat
  );
  
  return await bus.save();
};
