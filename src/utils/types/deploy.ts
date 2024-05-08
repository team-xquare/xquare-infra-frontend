export type DeployStatusType = 'AVAILABLE' | 'WAIT_FOR_APPROVE';
export type DeployType = 'fe' | 'be';

export type DeployListType = {
  deploy_id: string;
  deploy_name: string;
  repository: string;
  deploy_status: DeployStatusType;
};

export type DeployAllType = {
  deploy_list: DeployListType[];
};

export type DeployDetailType = {
  team_name_en: string;
  team_name_ko: string;
  one_line_description: string;
  repository: string;
  project_root_dir: string;
  deploy_status: DeployStatusType;
};

export type DeployCreateType = {
  deploy_name: string;
  organization: string;
  repository: string;
  project_root_dir: string;
  one_line_description: string;
  deploy_type: DeployType | '';
  use_redis: boolean;
  use_mysql: boolean;
};
