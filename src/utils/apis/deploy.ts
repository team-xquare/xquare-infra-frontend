import { useQuery } from '@tanstack/react-query';
import { DeployAllType, DeployCreateType } from '../types/deployType';
import { instance } from './axios';

const router = 'v1/deploy';

export const deployCreate = async (teamUUID: string, data: DeployCreateType) => {
  return await instance.post(`${router}?team_id=${teamUUID}`, data);
};

export const getAllDeploy = (teamUUID: string) => {
  const response = async () => {
    const { data } = await instance.get<DeployAllType>(`${router}/all?teamId=${teamUUID}`);
    return data;
  };

  return useQuery({ queryKey: ['deploy', teamUUID], queryFn: response });
};

export const getDetailDeploy = async (deployId: string) => {
  return await instance.get(`${router}/${deployId}`);
};

export const executionPipeline = async (deployUUID: string, env: 'prod' | 'stag') => {
  const response = await instance.post(`/v2/container/pipelines/schedule?deployId=${deployUUID}&environment=${env}`);

  return response;
};
