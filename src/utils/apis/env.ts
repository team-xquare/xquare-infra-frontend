import { instance } from './axios';

const router = '/v1/container/environment-variable';

export const getEnv = async (deployUUID: string, env: string) => {
  return await instance.get(`${router}?deployId=${deployUUID}&environment=${env}`);
};

export const patchEnv = async (deployUUID: string, env: string, data: Record<string, string>) => {
  return await instance.get(`${router}?deployId=${deployUUID}&environment=${env}`, data);
};
