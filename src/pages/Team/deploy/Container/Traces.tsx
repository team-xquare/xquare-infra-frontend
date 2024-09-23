import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { getTrace } from '@/utils/apis/trace';
import { TraceType } from '@/utils/types/traceType';
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

interface FilterState {
  OK: boolean;
  Error: boolean;
}

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count: number;
}) => (
  <CheckboxContainer onClick={onChange}>
    <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked}></StyledCheckbox>
    <CheckboxLabel>{label}</CheckboxLabel>
    <CountLabel>({count})</CountLabel>
  </CheckboxContainer>
);

export const TeamDeployContainerTraces = () => {
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null);
  const [container, setData] = useState<ContainerDetailType>();
  const [traces, setTraces] = useState<TraceType[]>();
  const [filteredTraces, setFilteredTraces] = useState<TraceType[]>();
  const [request, setRequest] = useState<JsonData>();
  const [error, setError] = useState<JsonData>();
  const [latency, setLatency] = useState<JsonData>();
  const [filter, setFilter] = useState<FilterState>({
    OK: false,
    Error: false,
  });
  const [traceCounts, setTraceCounts] = useState({ OK: 0, Error: 0 });
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
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });

      getContainerRequest(deployUUID, env).then((res) => {
        setRequest(res.data['0']);
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
  }, [container]);

  useEffect(() => {
    if (traces) {
      const okCount = traces.filter((trace) => trace.status_code && trace.status_code < 500).length;
      const errorCount = traces.filter((trace) => trace.status_code && trace.status_code >= 500).length;
      setTraceCounts({ OK: okCount, Error: errorCount });

      if (!filter.OK && !filter.Error) {
        setFilteredTraces(traces);
      } else {
        setFilteredTraces(
          traces.filter((trace) => {
            const statusCode = trace.status_code;
            if (!statusCode) return false;
            if (filter.OK && statusCode < 500) return true;
            if (filter.Error && statusCode >= 500) return true;
            return false;
          }),
        );
      }
    }
  }, [traces, filter]);

  const handleFilterChange = (category: keyof FilterState) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [category]: !prevFilter[category],
    }));
  };

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
        <ContentContainer>
          <OptionContainer>
            <span>Status</span>
            <CustomCheckbox
              label="OK"
              checked={filter.OK}
              onChange={() => handleFilterChange('OK')}
              count={traceCounts.OK}
            />
            <CustomCheckbox
              label="Error"
              checked={filter.Error}
              onChange={() => handleFilterChange('Error')}
              count={traceCounts.Error}
            />
          </OptionContainer>
          <TracesContainer>
            <TraceLabel>
              <DateLabel>DATE</DateLabel>
              <ResourceLabel>RESOURCE</ResourceLabel>
              <DurationLabel>DURATION</DurationLabel>
              <MethodLabel>METHOD</MethodLabel>
              <StatusCodeLabel>STATUS CODE</StatusCodeLabel>
            </TraceLabel>
            <ScrollableTraceItems>
              {filteredTraces &&
                filteredTraces.map((trace, index) => {
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
        </ContentContainer>
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
  max-width: 1100px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray4};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const OptionContainer = styled.div`
  width: 100%;
  max-width: 200px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray4};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 14px;
  position: sticky;
  top: 100px;
  > span {
    font-size: 20px;
    font-weight: 400;
    color: ${theme.color.gray8};
    margin-bottom: 10px;
  }
`;

const CheckboxContainer = styled.div`
  vertical-align: middle;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? theme.color.main : theme.color.gray1)};
  border: 1px solid ${theme.color.gray4};
  border-radius: 3px;
  transition: all 150ms;
`;

const CheckboxLabel = styled.span`
  margin-left: 8px;
`;

const CountLabel = styled.span`
  margin-left: 5px;
  color: ${theme.color.gray6};
  font-size: 14px;
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
  /* max-height: calc(100vh - 300px);
    overflow-y: auto;
    overflow-x: hidden; */
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
  color: ${theme.color.gray1};
  background-color: ${(props) => (props.status >= 500 ? theme.color.red : theme.color.green)};
`;
