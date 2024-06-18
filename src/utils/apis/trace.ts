import { instance } from './axios';

export const getTrace = async () => {
  return await instance.get(
    `${import.meta.env.VITE_SERVER_GRAFANA_URL}/api/search?q={ kind = server %26%26 span.http.status_code != nil %26%26 .service.name = "dms-be-prod"}&start=1718630439&end=1718630559`,
  );
};
