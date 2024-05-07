import { instance } from './axios';
import { SignInType, SignUpType } from '../types/authType';

const router = 'auth';

export const login = async (data: SignInType) => {
  return await instance.post(`${router}/login`, data);
};

export const signup = async (data: SignUpType) => {
  return await instance.post(`${router}/signup`, data);
};
