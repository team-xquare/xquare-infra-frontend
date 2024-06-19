import {DeployCreateType, DeployDetailType} from '../types/deploy';
import { instance } from './axios';

const router = 'deploy';

export const deployCreate = async (teamUUID: string, data: DeployCreateType) => {
  return await instance.post(`${router}?team_id=${teamUUID}`, data);
};

export const getAllDeploy = async (teamUUID: string) => {
  return await instance.get(`${router}/all?teamId=${teamUUID}`);
};

export const getDetailDeploy = async (deployId: string) => {
  return await instance.get<DeployDetailType>(`${router}/${deployId}`);
};
