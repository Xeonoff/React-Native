import axios from 'axios';

const IP = '192.168.0.253'
export const axiosInstance = axios.create({ baseURL: `http://${IP}:8000/` });