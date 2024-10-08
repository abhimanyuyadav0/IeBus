import Bus, { IBus } from '../models/bus.model';

// Create a new bus with seats
export const createBus = async (data: any): Promise<IBus> => {
  const bus = new Bus(data);
  return await bus.save();
};

// Get all buses
export const getAllBuses = async (): Promise<IBus[]> => {
  return await Bus.find().populate('from to stops').exec(); // Populate location details
};

// Get a bus by ID
export const getBusById = async (id: string): Promise<IBus | null> => {
  return await Bus.findById(id).populate('from to stops').exec();
};

// Update a bus by ID
export const updateBus = async (id: string, data: any): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }
  bus.set(data);
  return await bus.save();
};

// Delete a bus by ID
export const deleteBus = async (id: string): Promise<string> => {
  await Bus.findByIdAndDelete(id);
  return 'Bus deleted';
};

// Book seats on a bus
export const bookSeats = async (id: string, seatIds: number[]): Promise<IBus | null> => {
  const bus = await Bus.findById(id);
  if (!bus) {
    return null;
  }
  
  // Mark the specified seats as booked
  bus.seats = bus.seats.map(seat =>
    seatIds.includes(seat.id) ? { ...seat, booked: true } : seat
  );
  
  return await bus.save();
};
