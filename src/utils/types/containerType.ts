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

export type ContainerDetailType = {
  team_name_en: string;
  team_name_ko: string;
  deploy_name: string;
  repository: string;
  domain: string;
  last_deploy: string;
  container_status: ContainerStatusType;
  container_name: string;
};
