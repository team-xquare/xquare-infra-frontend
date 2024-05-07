import { instance } from './axios';
import { SignInType, SignUpType } from '../types/authType';
import axios from 'axios';

const router = 'auth';

export const login = async (data: SignInType) => {
  return await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/${router}/login`, data);
};

export const signup = async (data: SignUpType) => {
  return await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/${router}/signup`, data);
};
