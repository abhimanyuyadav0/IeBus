import axios from 'axios';
import apiEndPoint from '../handlers/endPoint';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://elite-mix-437808-u8.de.r.appspot.com/v1/',
  timeout: 10000, // Optional timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// API Functions

// Get Locations
const getLocations = async () => {
  try {
    const { data } = await api.get(apiEndPoint.location);
    return data;
  } catch (error:any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

// Create User
const createBus = async (payload:any) => {
  try {
    const { data } = await api.post(apiEndPoint.location, payload);
    return data;
  } catch (error:any) {
    console.error('Error creating location:', error.message || 'Unknown error');
    throw error;
  }
};

// Update Bus
const updateBus = async (id:any, payload:any) => {
  try {
    const { data } = await api.patch(`${apiEndPoint.location}/${id}`, payload);
    return data;
  } catch (error:any) {
    console.error(`Error updating location with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Delete Bus
const deleteBus = async (id:any) => {
  try {
    const { data } = await api.delete(`${apiEndPoint.location}/${id}`);
    return data;
  } catch (error:any) {
    console.error(`Error deleting location with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Get Bus by ID
const getBusById = async (id:any) => {
  try {
    const { data } = await api.get(`${apiEndPoint.location}/${id}`);
    return data;
  } catch (error:any) {
    console.error(`Error fetching location with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};
export {
  getLocations,
  createBus,
  updateBus,
  deleteBus,
  getBusById
};
