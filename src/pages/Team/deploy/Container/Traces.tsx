import { theme } from '@/style/theme';
import { getTrace } from '@/utils/apis/trace';
import { TraceType } from '@/utils/types/traceType';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDetailContainer,
  getContainerRequest,
  getContainerError,
  getContainerLatency,
} from '@/utils/apis/container';
import { ContainerDetailType } from '@/utils/types/containerType';
import { TraceRequestGraph } from '@/components/graph/TraceRequestGraph';
import { TraceErrorGraph } from '@/components/graph/TraceErrorGraph';
import { TraceLatencyGraph } from '@/components/graph/TraceLatencyGraph';
import { TraceInformation } from '@/components/Trace/TraceInformation';

interface DataPoint {
  [timestamp: string]: string;
}

interface JsonData {
  [key: string]: DataPoint;
}

interface ExtendedDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  millisecond?: '2-digit' | '3-digit';
}

const getCurrentTimeFromStamp = (timestampNano: string) => {
  try {
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

export const TeamDeployContainerTraces = () => {
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null);
  const [container, setData] = useState<ContainerDetailType>();
  const [traces, setTraces] = useState<TraceType[]>();
  const [request, setRequest] = useState<JsonData>();
  const [error, setError] = useState<JsonData>();
  const [latency, setLatency] = useState<JsonData>();
  const { deployUUID, env } = useParams();

  useEffect(() => {
    if (deployUUID && env) {
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });

      getContainerRequest(deployUUID, env).then((res) => {
        setRequest(res.data['0']);
        console.log(res.data['0']);
      });

      getContainerError(deployUUID, env).then((res) => {
        setError(res.data['0']);
      });

      Promise.all([
        getContainerLatency(99, deployUUID, env),
        getContainerLatency(95, deployUUID, env),
        getContainerLatency(90, deployUUID, env),
        getContainerLatency(75, deployUUID, env),
        getContainerLatency(50, deployUUID, env),
      ])
        .then(([res99, res95, res90, res75, res50]) => {
          setLatency({
            99: res99.data['0'],
            95: res95.data['0'],
            90: res90.data['0'],
            75: res75.data['0'],
            50: res50.data['0'],
          });
        })
        .catch((error) => {
          console.error('Error fetching latency data:', error);
        });
    }
  }, []);

  useEffect(() => {
    let currentTime = Math.floor(Date.now() / 1000) - 5;
    const oneHourAgo = currentTime - 3605;

    if (container?.container_name) {
      getTrace(container.container_name, oneHourAgo, currentTime).then((res) => {
        setTraces(res.data.traces);
      });

      const interval = setInterval(() => {
        const newCurrentTime = Math.floor(Date.now() / 1000) - 5;
        getTrace(container.container_name, currentTime, newCurrentTime)
          .then((res) => {
            setTraces((prevTraces) => {
              return [...res.data.traces, ...(prevTraces || [])];
            });
          })
          .catch((err) => {
            console.error('Error fetching traces:', err);
          });
        currentTime = newCurrentTime;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [container]);

  return (
    <>
      <TraceInformation selectedTrace={selectedTrace} setSelectedTrace={setSelectedTrace} />
      <Wrapper>
        <GraphContainer>
          <GraphBox>
            <span>Requests</span>
            {request && Object.keys(request).length !== 0 && <TraceRequestGraph jsonData={request} />}
          </GraphBox>
          <GraphBox>
            <span>Errors</span>
            {error && Object.keys(error).length !== 0 && <TraceErrorGraph jsonData={error} />}
          </GraphBox>
          <GraphBox>
            <span>Latency</span>
            {latency && Object.keys(latency).length === 5 && <TraceLatencyGraph jsonData={latency} />}
          </GraphBox>
        </GraphContainer>
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
                <TraceItem
                  key={index}
                  onClick={() => {
                    setSelectedTrace(trace.traceID === selectedTrace ? null : trace.traceID);
                  }}
                >
                  <DateItem>{currentTime}</DateItem>
                  <ResourceItem>{trace.rootTraceName ?? ''}</ResourceItem>
                  <DurationItem>{trace.durationMs ?? ''}ms</DurationItem>
                  <MethodItem>{trace.rootTraceName?.split(' ')[0] ?? ''}</MethodItem>
                  <StatusCodeItem>
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
    </>
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
  width: 800px;
  display: flex;
  align-items: center;
`;

const DurationLabel = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MethodLabel = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusCodeLabel = styled.div`
  width: 190px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TraceItem = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 20px;
  font-weight: 300;
  display: flex;
  border-bottom: 1px solid ${theme.color.gray4};
  background-color: ${theme.color.gray1};
  transition: 0.1s linear;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #eaf6fc;
  }
`;

const DateItem = styled.div`
  width: 290px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
`;

const ResourceItem = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
`;

const DurationItem = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;

const MethodItem = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusCodeItem = styled.div`
  width: 190px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
`;

const GraphBox = styled.div`
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid ${theme.color.gray4};
  background-color: ${theme.color.gray1};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  > span {
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.gray8};
  }
`;
