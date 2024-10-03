import { useQuery } from '@tanstack/react-query';
import { Response } from '../types/apm';
import { instance } from './axios';

export const getServicemapData = (teamUUID: string | undefined, startTime: string, endTime: string) => {
  const response = async () => {
    const { data } = await instance.get<Response>(
      `/trace/service-map?teamId=${teamUUID}&startTimeNano=${startTime}&endTimeNano=${endTime}`,
    );
    return data;
  };

  return useQuery({ queryKey: ['servicemap', teamUUID], queryFn: response, enabled: !!teamUUID });
};
