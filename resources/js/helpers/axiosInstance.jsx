import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '', // Replace with your API's base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add any other custom headers if needed
  },
});

// You can add interceptors here if needed
axiosInstance.interceptors.request.use(
  (config) =>
    // Do something before request is sent
    config,
  (error) =>
    // Do something with request error
    Promise.reject(error),

);

axiosInstance.interceptors.response.use(
  (response) =>
    // Do something with response data
    response,
  (error) =>
    // Do something with response error
    Promise.reject(error),

);

export default axiosInstance;
