import apiEndPoint from '../handlers/endPoint';
import api from '../handlers/api';

const getLocations = async () => {
  try {
    const {data} = await api.get(apiEndPoint.location);
    return data;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

const createBus = async (payload: any) => {
  try {
    const {data} = await api.post(apiEndPoint.location, payload);
    return data;
  } catch (error: any) {
    console.error('Error creating location:', error.message || 'Unknown error');
    throw error;
  }
};

const updateBus = async (id: any, payload: any) => {
  try {
    const {data} = await api.patch(`${apiEndPoint.location}/${id}`, payload);
    return data;
  } catch (error: any) {
    console.error(
      `Error updating location with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

// Delete Bus
const deleteBus = async (id: any) => {
  try {
    const {data} = await api.delete(`${apiEndPoint.location}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error deleting location with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

// Get Bus by ID
const getBusById = async (id: any) => {
  try {
    const {data} = await api.get(`${apiEndPoint.location}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error fetching location with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};
export {getLocations, createBus, updateBus, deleteBus, getBusById};
