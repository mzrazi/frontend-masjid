import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://api.example.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
