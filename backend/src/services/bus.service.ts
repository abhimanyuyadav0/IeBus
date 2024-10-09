import Bus, {IBus, ISeat} from '../models/bus.model';

export const createBus = async (data: any): Promise<IBus> => {
  const bus = new Bus(data);
  return await bus.save();
};

export const getAllBuses = async (): Promise<IBus[]> => {
  return await Bus.find().populate('from to stops').exec();
};

export const getBusById = async (id: string): Promise<IBus | null> => {
  return await Bus.findById(id).populate('from to stops').exec();
};

export const updateBus = async (
  id: string,
  data: any,
): Promise<IBus | null> => {
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

export const bookSeats = async (
  id: string,
  seatIds: string[],
): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }

  bus.seats = bus.seats.map((seat: ISeat): any => {
    return seatIds.includes(seat._id.toString())
      ? {...seat.toObject(), booked: true}
      : seat; 
  });

  return await bus.save();
};

export const cancelSeats = async (
  id: string,
  seatIds: string[],
): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }

  bus.seats = bus.seats.map((seat: ISeat): any => {
    return seatIds.includes(seat._id.toString())
      ? {...seat.toObject(), booked: false}
      : seat; 
  });

  return await bus.save();
};
