import apiEndPoint from '../handlers/endPoint';
import api from '../handlers/api';

const getOrders = async (id: any) => {
  try {
    const {data} = await api.get(`${apiEndPoint.order}/${id}`);
    return data;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message || 'Unknown error');
    throw error;
  }
};

const createOrder = async (payload: any) => {
  try {
    const {data} = await api.post(apiEndPoint.order, payload);
    return data;
  } catch (error: any) {
    console.error('Error creating order:', error.message || 'Unknown error');
    throw error;
  }
};

const updateOrder = async (id: any, payload: any) => {
  try {
    const {data} = await api.patch(`${apiEndPoint.order}/${id}`, payload);
    return data;
  } catch (error: any) {
    console.error(
      `Error updating order with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

const deleteOrder = async (id: any) => {
  try {
    const {data} = await api.delete(`${apiEndPoint.order}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error deleting order with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};

const getOrderById = async (id: any) => {
  try {
    const {data} = await api.get(`${apiEndPoint.order}/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      `Error fetching order with ID ${id}:`,
      error.message || 'Unknown error',
    );
    throw error;
  }
};
export {getOrders, createOrder, updateOrder, deleteOrder, getOrderById};
