import { instance } from './axios';

const router = 'v2/container/history';

export const getHistory = async (deployUUID: string, env: string) => {
  return await instance.get(`${router}?deployId=${deployUUID}&environment=${env}`);
};
