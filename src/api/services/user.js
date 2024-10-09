import apiEndPoint from '../handlers/endPoint';
import api from '../handlers/api';

const getUsers = async () => {
  try {
    const { data } = await api.get(apiEndPoint.user);
    return data;
  } catch (error) {
    console.log('Error fetching users:', error.message || 'Unknown error');
    throw error;
  }
};

const createUser = async (payload) => {
  try {
    const { data } = await api.post(apiEndPoint.user, payload);
    return data;
  } catch (error) {
    console.log('Error creating user:', error.message || 'Unknown error');
    throw error;
  }
};

const updateUser = async (id, payload) => {
  try {
    const { data } = await api.patch(`${apiEndPoint.user}/${id}`, payload);
    return data;
  } catch (error) {
    console.log(`Error updating user with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`${apiEndPoint.user}/${id}`);
    return data;
  } catch (error) {
    console.log(`Error deleting user with ID ${id}:`, error.message || 'Unknown error');
    throw error;
  }
};

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
export {
  loginUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
