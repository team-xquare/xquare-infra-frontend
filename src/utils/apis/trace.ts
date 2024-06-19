import { instance } from './axios';

export const getTrace = async (containerName: string, startUnixTime: number, endUnixTime: number) => {
  return await instance.get(
    `${import.meta.env.VITE_SERVER_GRAFANA_URL}/api/search?q={kind=server%26%26span.http.status_code!= nil%26%26.service.name="${containerName}"}&start=${startUnixTime}&end=${endUnixTime}`,
  );
};
