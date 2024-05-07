import { instance } from './axios';

const router = 'user';

export const getUser = async () => {
  return await instance.get(`${router}/all`);
};
