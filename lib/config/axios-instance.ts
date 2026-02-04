import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../constants/env';

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false
});
