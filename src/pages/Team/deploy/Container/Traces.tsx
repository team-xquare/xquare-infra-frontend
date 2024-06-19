import { theme } from '@/style/theme';
import { getTrace } from '@/utils/apis/trace';
import { TraceType } from '@/utils/types/traceType';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface ExtendedDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  millisecond?: '2-digit' | '3-digit';
}

const getCurrentTimeFromStamp = (timestampNano: string) => {
  try {
    // Convert nanoseconds to seconds
    const timestampSeconds = parseInt(timestampNano, 10) / 1_000_000_000;
    const myDate = new Date(timestampSeconds * 1000);
    const options: ExtendedDateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      millisecond: '3-digit',
      hour12: false,
    };
    const formattedDateTime = myDate.toLocaleString('en-US', options);
    const [dateTimeString, milliseconds] = formattedDateTime.split('.');
    if (milliseconds) {
      return `${dateTimeString}.${milliseconds.padStart(3, '0')}`;
    } else {
      return formattedDateTime;
    }
  } catch (error) {
    console.error('Error getting current time from timestamp:', error);
    return 'Invalid timestamp';
  }
};

const startTimeUnixNano = '1718630443155390045';
const currentTime = getCurrentTimeFromStamp(startTimeUnixNano);
console.log(currentTime); // Output: 2023년 4월 25일 21:07:23.155

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
          <DateLabel>DATE</DateLabel>
          <ResourceLabel>RESOURCE</ResourceLabel>
          <DurationLabel>DURATION</DurationLabel>
          <MethodLabel>METHOD</MethodLabel>
          <StatusCodeLabel>STATUS CODE</StatusCodeLabel>
        </TraceLabel>
        {traces &&
          traces.map((trace, index) => {
            const currentTime = getCurrentTimeFromStamp(trace.startTimeUnixNano);
            return (
              <TraceItem key={index}>
                <DateItem>{currentTime}</DateItem>
                <ResourceItem>{trace.rootTraceName}</ResourceItem>
                <DurationItem>{trace.durationMs}ms</DurationItem>
                <MethodItem>{trace.rootTraceName.split(' ')[0]}</MethodItem>
                <StatusCodeItem>
                  {/* {
                    trace.spanSet.spans[0].attributes.filter((attribute) => attribute.key === 'http.status_code')[0]
                      .value.intValue
                  } */}

                  {
                    trace.spanSet.spans[0].attributes.filter((attr) => attr.key === 'http.status_code')[0].value
                      .intValue
                  }
                </StatusCodeItem>
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
  background-color: ${theme.color.gray2};
  border-bottom: 1px solid ${theme.color.gray4};
`;

const DateLabel = styled.div`
  width: 290px;
  padding-left: 40px;
  display: flex;
  align-items: center;
`;

const ResourceLabel = styled.div`
  width: 382px;
  display: flex;
  align-items: center;
`;

const DurationLabel = styled.div`
  width: 160px;
  display: flex;
  align-items: center;
`;

const MethodLabel = styled.div`
  width: 326px;
  display: flex;
  align-items: center;
`;

const StatusCodeLabel = styled.div`
  width: 386px;
  display: flex;
  align-items: center;
`;

const TraceItem = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 20px;
  font-weight: 300;
  display: flex;
  border-bottom: 1px solid ${theme.color.gray4};
  &:last-child {
    border-bottom: none;
  }
`;

const DateItem = styled.div`
  width: 290px;
  padding-left: 40px;
  display: flex;
  align-items: center;
`;

const ResourceItem = styled.div`
  width: 382px;
  display: flex;
  align-items: center;
`;

const DurationItem = styled.div`
  width: 160px;
  display: flex;
  align-items: center;
`;

const MethodItem = styled.div`
  width: 326px;
  display: flex;
  align-items: center;
`;

const StatusCodeItem = styled.div`
  width: 386px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;
