export type StageType = {
  name: 'build' | 'deploy';
  status: 'Building' | 'Passed' | 'Failed' | 'Unknown';
};

export type HistoryType = {
  name: string;
  email: string;
  scheduled_date: number;
  commit_message: string;
  stages: StageType[];
  pipeline_name: string;
  pipeline_counter: number;
};
