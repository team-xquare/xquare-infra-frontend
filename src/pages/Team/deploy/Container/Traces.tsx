import { theme } from '@/style/theme';
import { getTrace } from '@/utils/apis/trace';
import { TraceType } from '@/utils/types/traceType';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContainerRequest, getContainerError, getContainerLatency } from '@/utils/apis/container';
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

export const TeamDeployContainerTraces = () => {
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null);
  const [traces, setTraces] = useState<TraceType[]>();
  const [request, setRequest] = useState<JsonData>();
  const [error, setError] = useState<JsonData>();
  const [latency, setLatency] = useState<JsonData>();
  const { deployUUID, env } = useParams();
  const bodySelector = document.querySelector('body');

  useEffect(() => {
    if (selectedTrace) {
      if (!bodySelector) return;
      bodySelector.style.overflowY = 'hidden';
    } else {
      if (!bodySelector) return;
      bodySelector.style.overflowY = 'auto';
    }
  }, [selectedTrace]);

  useEffect(() => {
    if (deployUUID && env) {
      const fetchData = () => {
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
      };

      fetchData();

      const intervalId = setInterval(fetchData, 60000);

      return () => clearInterval(intervalId);
    }
  }, [deployUUID, env]);

  useEffect(() => {
    const oneHourAgo = 3600;

    if (deployUUID && env) {
      getTrace(deployUUID, env, oneHourAgo).then((res) => {
        setTraces(res.data.spans);
      });

      const interval = setInterval(() => {
        getTrace(deployUUID, env, 5)
          .then((res) => {
            setTraces((prevTraces) => {
              return [...res.data.spans, ...(prevTraces || [])];
            });
          })
          .catch((err) => {
            console.error('Error fetching traces:', err);
          });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [deployUUID, env]);

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
          <ScrollableTraceItems>
            {traces &&
              traces.map((trace, index) => {
                return (
                  <TraceItem
                    key={index}
                    onClick={() => {
                      setSelectedTrace(trace.trace_id === selectedTrace ? null : trace.trace_id);
                    }}
                  >
                    {trace.status_code && <RodItem status={trace.status_code}></RodItem>}
                    <DateItem>{trace.date}</DateItem>
                    <ResourceItem>{trace.resource ?? ''}</ResourceItem>
                    <DurationItem>{trace.duration_ms ?? ''}ms</DurationItem>
                    <MethodItem>{trace.method ?? ''}</MethodItem>
                    <StatusCodeItem>
                      {trace.status_code && (
                        <StatusCodeBox status={trace.status_code}>{trace.status_code}</StatusCodeBox>
                      )}
                    </StatusCodeItem>
                  </TraceItem>
                );
              })}
          </ScrollableTraceItems>
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
  max-width: 1200px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray4};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TraceLabel = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  height: 52px;
  background-color: ${theme.color.gray2};
  border-bottom: 1px solid ${theme.color.gray4};
`;

const ScrollableTraceItems = styled.div`
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const TraceItem = styled.div`
  width: 100%;
  color: ${theme.color.gray8};
  font-size: 16px;
  font-weight: 300;
  display: flex;
  height: 30px;
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

const DateLabel = styled.div`
  width: 25%;
  min-width: 200px;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

const ResourceLabel = styled.div`
  width: 35%;
  min-width: 250px;
  display: flex;
  align-items: center;
`;

const DurationLabel = styled.div`
  width: 10%;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MethodLabel = styled.div`
  width: 10%;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusCodeLabel = styled.div`
  width: 20%;
  min-width: 150px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateItem = styled.div`
  width: 25%;
  min-width: 200px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
`;

const ResourceItem = styled.div`
  width: 35%;
  min-width: 250px;
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RodItem = styled.div<{ status: number }>`
  width: 8px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
  background-color: ${(props) => {
    if (props.status < 300) return theme.color.green;
    if (props.status < 400) return theme.color.infoDark1;
    if (props.status < 500) return theme.color.brown;
    return theme.color.red;
  }};
`;

const DurationItem = styled.div`
  width: 10%;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;

const MethodItem = styled.div`
  width: 10%;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusCodeItem = styled.div`
  width: 20%;
  min-width: 150px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 1300px) {
    justify-content: center;
  }
`;

const GraphBox = styled.div`
  flex: 1;
  min-width: 370px;
  max-width: 370px;
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

  @media (max-width: 460px) {
    min-width: 100%;
  }
`;

const StatusCodeBox = styled.div<{ status: number }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 220;
  color: ${(props) => {
    if (props.status < 300) return theme.color.gray1;
    if (props.status < 400) return theme.color.gray1;
    if (props.status < 500) return theme.color.gray1;
    return theme.color.gray1;
  }};
  background-color: ${(props) => {
    if (props.status < 300) return theme.color.green;
    if (props.status < 400) return theme.color.infoDark1;
    if (props.status < 500) return theme.color.brown;
    return theme.color.red;
  }};
`;
