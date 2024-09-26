import { useQuery } from '@tanstack/react-query';
import { TeamCheckType, TeamCreateType, TeamDetailType } from '../types/teamType';
import { instance } from './axios';

const router = 'v1/team';

export const teamCheck = () => {
  const response = async () => {
    const { data } = await instance.get<TeamCheckType>(`${router}/my-team`);
    return data.team_list;
  };

  return useQuery({ queryKey: ['my-team'], queryFn: response });
};

export const teamCreate = async (data: TeamCreateType) => {
  return await instance.post(`${router}`, data);
};

export const teamDetailCheck = (uuid: string | undefined) => {
  const respones = async () => {
    const { data } = await instance.get<TeamDetailType>(`${router}/detail/${uuid}`);
    return data;
  };

  return useQuery({
    queryKey: [uuid, 'team-detail'],
    queryFn: () => respones(),
    enabled: !!uuid,
  });
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
