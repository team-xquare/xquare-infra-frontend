import { theme } from '@/style/theme';
import { getTrace } from '@/utils/apis/trace';
import { TraceType } from '@/utils/types/traceType';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const getCurrentTimeFromStamp = (timestamp: number) => {
  try {
    const myDate = new Date(timestamp / 1000000);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return myDate.toLocaleString('ko-KR', options).split(', ');
  } catch (error) {
    console.error('Error getting current time from timestamp:', error);
    return ['Invalid timestamp'];
  }
};

export const TeamDeployContainerTraces = () => {
  const [traces, setTraces] = useState<TraceType[]>();

  useEffect(() => {
    getTrace().then((res) => {
      setTraces(res.data.traces);
    });
  }, []);

  return (
    <Wrapper>
      <TracesContainer>
        <TraceLabel>
          <div>DATE</div>
          <div>RESOURCE</div>
          <div>DURATION</div>
          <div>METHOD</div>
          <div>STATUS CODE</div>
        </TraceLabel>
        {traces &&
          traces.map((trace, _) => {
            const currentTime = getCurrentTimeFromStamp(parseInt(trace.startTimeUnixNano));
            return (
              <TraceItem>
                <div>{currentTime}</div>
                <div>{trace.rootTraceName}</div>
                <div>{trace.durationMs}ms</div>
                <div>{trace.rootTraceName.split(' ')[0]}</div>
                <div>{}</div>
              </TraceItem>
            );
          })}
      </TracesContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TracesContainer = styled.div`
  width: 100%;
  max-width: 1540px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray4};
  display: flex;
  flex-direction: column;
`;

const TraceLabel = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 20px;
  font-weight: 600;
  display: flex;
  height: 52px;
  > div:nth-of-type(1) {
    width: 290px;
    padding-left: 40px;
  }
  > div:nth-of-type(2) {
    width: 382px;
  }
  > div:nth-of-type(3) {
    width: 160px;
  }
  > div:nth-of-type(4) {
    width: 326px;
  }
  > div:nth-of-type(5) {
    width: 386px;
  }
`;

const TraceItem = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 20px;
  font-weight: 600;
  display: flex;
  > div:nth-of-type(1) {
    width: 290px;
  }
  > div:nth-of-type(2) {
    width: 382px;
  }
  > div:nth-of-type(3) {
    width: 160px;
  }
  > div:nth-of-type(4) {
    width: 326px;
  }
  > div:nth-of-type(5) {
    width: 386px;
  }
`;
