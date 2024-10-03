import ServiceMap from '@/components/servicemap';
import { getServicemapData } from '@/utils/apis/apm';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

export const ServiceMapPage = () => {
  const { teamUUID } = useParams();

  const getCurrentAndOneMinuteAgo = () => {
    const now = Date.now();
    const currentNanoTime = BigInt(now) * BigInt(1_000_000);
    const oneMinuteAgo = now - 60000;
    const oneMinuteAgoNanoTime = BigInt(oneMinuteAgo) * BigInt(1_000_000);

    return {
      startTime: oneMinuteAgoNanoTime.toString(),
      endTime: currentNanoTime.toString(),
    };
  };

  const { startTime, endTime } = getCurrentAndOneMinuteAgo();
  const { data, isSuccess } = getServicemapData(teamUUID, startTime, endTime);

  return <Wrapper>{isSuccess && <ServiceMap data={data} />}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
