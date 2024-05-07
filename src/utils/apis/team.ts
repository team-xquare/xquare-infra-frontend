import { TeamCreateType } from '../types/teamType';
import { instance } from './axios';

const router = 'team';

export const teamCheck = async () => {
  return await instance.get(`${router}/my-team`);
};

export const teamCreate = async (data: TeamCreateType) => {
  return await instance.post(`${router}`, data);
};
