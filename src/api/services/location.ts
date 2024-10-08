import axios from 'axios';
import apiEndPoint from '../handlers/endPoint';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://elite-mix-437808-u8.de.r.appspot.com/v1/',
  timeout: 10000, // Optional timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
const getLocations = async () => {
  try {
    const {data} = await api.get(apiEndPoint.location);
    return data;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

export {getLocations};
