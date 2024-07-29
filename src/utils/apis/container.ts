import { ContainerEnvType } from '../types/containerType';
import { instance } from './axios';

const router = 'v1/container';

export const getAllContainer = async (deployUUID: string) => {
  return await instance.get(`${router}?deployId=${deployUUID}`);
};

export const getDetailContainer = async (deployUUID: string, env: string) => {
  return await instance.get(`${router}/details?deployId=${deployUUID}&environment=${env}`);
};

export const getCPU = async (deployUUID: string, env: ContainerEnvType) => {
  return await instance.get(`${router}/cpu?deployId=${deployUUID}&environment=${env}`);
};

export const getMemory = async (deployUUID: string, env: ContainerEnvType) => {
  return await instance.get(`${router}/memory?deployId=${deployUUID}&environment=${env}`);
};
