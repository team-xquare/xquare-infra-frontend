export type ContainerEnvType = 'stag' | 'prod';
export type ContainerStatusType = 'RUNNING' | 'PENDING' | 'ERROR';

export type ContainerAllType = {
  container_name: string;
  container_environment: ContainerEnvType;
  container_status: ContainerStatusType;
  repository: string;
  domain: string;
  last_deploy: string;
};
