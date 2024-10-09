import apiEndPoint from '../handlers/endPoint';
import api from '../handlers/api';

const getBuses = async () => {
  try {
    const {data} = await api.get(apiEndPoint.bus);
    return data;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

const createBus = async (payload: any) => {
  try {
    const {data} = await api.post(apiEndPoint.bus, payload);
    return data;
  } catch (error: any) {
    console.error('Error creating bus:', error.message || 'Unknown error');
    throw error;
  }
};
const bookBusSeat = async (id: any, seatIds: any) => {
  const payload = {seatIds: seatIds};
  try {
    const {data} = await api.patch(`${apiEndPoint.bus}/${id}/book`, payload);
  return data;
  } catch (error: any) {
    console.error(
      `Error updating bus with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};
const cancelBusSeat = async (id: any, seatIds: any) => {
  const payload = {seatIds: seatIds};
  try {
    const {data} = await api.patch(`${apiEndPoint.bus}/${id}/cancel`, payload);
  console.log(data,'updated');
  return data;
  } catch (error: any) {
    console.error(
      `Error updating bus with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};
const updateBus = async (id: any, payload: any) => {
  try {
    const {data} = await api.patch(`${apiEndPoint.bus}/${id}`, payload);
    return data;
  } catch (error: any) {
    console.error(
      `Error updating bus with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

const deleteBus = async (id: any) => {
  try {
    const {data} = await api.delete(`${apiEndPoint.bus}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error deleting bus with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

const getBusById = async (id: any) => {
  try {
    const {data} = await api.get(`${apiEndPoint.bus}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error fetching bus with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};
export {getBuses, createBus, updateBus, deleteBus, getBusById, bookBusSeat,cancelBusSeat};
