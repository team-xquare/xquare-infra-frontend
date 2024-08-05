import { ConfigPostType } from '../types/containerType';
import { instance } from './axios';

const v1Router = 'v1/container';
const v2Router = 'v2/container';

export const getAllContainer = async (deployUUID: string) => {
  return await instance.get(`${v1Router}?deployId=${deployUUID}`);
};

export const getDetailContainer = async (deployUUID: string, env: string) => {
  return await instance.get(`${v1Router}/details?deployId=${deployUUID}&environment=${env}`);
};

export const getCPU = async (deployUUID: string, env: string) => {
  return await instance.get(`${v1Router}/cpu?deployId=${deployUUID}&environment=${env}`);
};

export const getMemory = async (deployUUID: string, env: string) => {
  return await instance.get(`${v1Router}/memory?deployId=${deployUUID}&environment=${env}`);
};

export const writeContainerConfig = async (deployUUID: string, data: ConfigPostType) => {
  return await instance.post(`${v2Router}/config?deployId=${deployUUID}`, data);
};

export const writeContainerGradle = async (
  deployUUID: string,
  env: string,
  data: {
    jdk_version: string;
    output_dir: string;
    build_commands: string[];
  },
) => {
  return await instance.post(`${v2Router}/gradle?deployId=${deployUUID}&environment=${env}`, data);
};

export const writeContainerNode = async (
  deployUUID: string,
  env: string,
  data: {
    node_version: string;
    command: string;
    build_commands: string[];
  },
) => {
  return await instance.post(`${v2Router}/gradle?deployId=${deployUUID}&environment=${env}`, data);
};

export const writeContainerNginx = async (
  deployUUID: string,
  env: string,
  data: {
    node_version: string;
    output_dir: string;
    build_commands: string[];
  },
) => {
  return await instance.post(`${v2Router}/gradle?deployId=${deployUUID}&environment=${env}`, data);
};

export const getStageLog = async (pipelineName: string, pipelineCounter: string, stageName: string) => {
  return await instance.get(`${v2Router}/${pipelineName}/${pipelineCounter}/stage/${stageName}`);
};
