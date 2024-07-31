import { TeamCreateType } from '../types/teamType';
import { instance } from './axios';

const router = '/team';

export const teamCheck = async () => {
  return await instance.get(`${router}/my-team`);
};

export const teamCreate = async (data: TeamCreateType) => {
  return await instance.post(`${router}`, data);
};

export const teamDetailCheck = async (uuid: string) => {
  return await instance.get(`${router}/detail/${uuid}`);
};

export const teamMemberPut = async (uuid: string, user_ids: string[]) => {
  return await instance.put(`${router}/${uuid}/members`, {
    members: user_ids,
  });
};

export const teamMemberDelete = async (uuid: string, user_id: string) => {
  return await instance.delete(`${router}/${uuid}/members`, {
    data: {
      user_id: user_id,
    },
  });
};
