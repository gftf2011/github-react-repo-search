import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 3000,
  timeoutErrorMessage: '3 seconds call exceeded!',
});

export default api;
