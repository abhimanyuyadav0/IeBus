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

export {getLocations};
