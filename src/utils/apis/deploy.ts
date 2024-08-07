import { DeployCreateType } from '../types/deployType';
import { instance } from './axios';

const router = 'v1/deploy';

export const deployCreate = async (teamUUID: string, data: DeployCreateType) => {
  return await instance.post(`${router}?team_id=${teamUUID}`, data);
};

export const getAllDeploy = async (teamUUID: string) => {
  return await instance.get(`${router}/all?teamId=${teamUUID}`);
};

export const getDetailDeploy = async (deployId: string) => {
  return await instance.get(`${router}/${deployId}`);
};
