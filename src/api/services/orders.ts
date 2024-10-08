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

// Get Orders
const getOrders = async () => {
  try {
    const { data } = await api.get(apiEndPoint.order);
    return data;
  } catch (error:any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

// Create User
const createOrder = async (payload:any) => {
  try {
    const { data } = await api.post(apiEndPoint.order, payload);
    return data;
  } catch (error:any) {
    console.error('Error creating order:', error.message || 'Unknown error');
    throw error;
  }
};

// Update Order
const updateOrder = async (id:any, payload:any) => {
  try {
    const { data } = await api.patch(`${apiEndPoint.order}/${id}`, payload);
    return data;
  } catch (error:any) {
    console.error(`Error updating order with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Delete Order
const deleteOrder = async (id:any) => {
  try {
    const { data } = await api.delete(`${apiEndPoint.order}/${id}`);
    return data;
  } catch (error:any) {
    console.error(`Error deleting order with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Get Order by ID
const getOrderById = async (id:any) => {
  try {
    const { data } = await api.get(`${apiEndPoint.order}/${id}`);
    return data;
  } catch (error:any) {
    console.error(`Error fetching order with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};
export {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById
};
