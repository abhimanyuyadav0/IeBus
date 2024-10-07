// src/api/handlers/api.js
import axios from 'axios';
export const BASE_URL = 'https://elite-mix-437808-u8.de.r.appspot.com/v1/';
const createAPI = () => {
   const apiHeader = {
      'Content-Type': 'application/json',
   };
   const api = axios.create({
      baseURL: BASE_URL,
      headers: apiHeader,
   });

   api.interceptors.response.use(
      (response) => response,
      (error) => {
         if (
            error?.response?.status === 401 ||
            error?.response?.status === 403 ||
            error?.response?.status === 400
         ) {
            console.log(error?.response?.data, 'error');
         }
         throw error?.response?.data;
      }
   );
   return api;
};

// Ensure you're exporting the API instance correctly
export default createAPI();
