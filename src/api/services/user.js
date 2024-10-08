import axios from 'axios';
import apiEndPoint from '../handlers/endPoint';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/v1/',
  timeout: 10000, // Optional timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// API Functions

// Get Users
const getUsers = async () => {
  try {
    const { data } = await api.get(apiEndPoint.user);
    return data;
  } catch (error) {
    console.log('Error fetching users:', error.message || 'Unknown error');
    throw error;
  }
};

// Create User
const createUser = async (payload) => {
  try {
    const { data } = await api.post(apiEndPoint.user, payload);
    return data;
  } catch (error) {
    console.log('Error creating user:', error.message || 'Unknown error');
    throw error;
  }
};

// Update User
const updateUser = async (id, payload) => {
  try {
    const { data } = await api.patch(`${apiEndPoint.user}/${id}`, payload);
    return data;
  } catch (error) {
    console.log(`Error updating user with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Delete User
const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`${apiEndPoint.user}/${id}`);
    return data;
  } catch (error) {
    console.log(`Error deleting user with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

// Get User by ID
const getUserById = async (id) => {
  try {
    const { data } = await api.get(`${apiEndPoint.user}/${id}`);
    return data;
  } catch (error) {
    console.log(`Error fetching user with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};
const loginUser = async (payload) => {
  console.log('login called', payload)
  try {
    const { data } = await api.post(apiEndPoint.login, payload);
    return data;
  } catch (error) {
    console.log(`Error fetching user with ID `, error.message || 'Unknown error');
    throw error;
  }
};
// Export all functions
export {
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
