import { instance } from './axios';

export const getTrace = async (deployUUID: string, env: string, timeRange: number) => {
  return await instance.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/trace/list?deployId=${deployUUID}&environment=${env}&timeRange=${timeRange}`,
  );
};

export const getDetailTrace = async (traceId: string) => {
  return await instance.get(`${import.meta.env.VITE_SERVER_BASE_URL}/trace/${traceId}`);
};
