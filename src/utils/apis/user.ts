import { instance } from './axios';

const router = 'v1/user';

export const getUser = async () => {
  return await instance.get(`${router}/all`);
};
