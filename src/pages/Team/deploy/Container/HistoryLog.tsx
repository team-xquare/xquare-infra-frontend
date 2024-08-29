import { theme } from '@/style/theme';
import { getStageLog } from '@/utils/apis/container';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const TeamDeployContainerHistoryLog = () => {
  const { pipelineName, pipelineCounter, stageName } = useParams();
  const [data, setData] = useState<string>();

  useEffect(() => {
    if (pipelineName && pipelineCounter && stageName) {
      getStageLog(pipelineName, pipelineCounter, stageName).then((res) => {
        setData(res.data);
      });
    }
    const interval = setInterval(() => {
      if (pipelineName && pipelineCounter && stageName) {
        getStageLog(pipelineName, pipelineCounter, stageName).then((res) => {
          setData(res.data);
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [pipelineName, pipelineCounter, stageName]);

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>stage</TeamName>
        {stageName && <Title>{stageName}</Title>}
      </TitleContainer>
      {data && (
        <BuildLog>
          {data.split('\n').map((ele, idx) => {
            return <div key={idx}>{ele}</div>;
          })}
        </BuildLog>
      )}
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

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TeamName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.color.gray5};
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
  display: flex;
  align-items: center;
  gap: 14px;
`;

const BuildLog = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100%;
  background-color: #333333;
  border-radius: 8px;
  padding: 30px;
  > div {
    word-wrap: break-word;
    font-family: 'JetBrains Mono';
    font-weight: 600;
    font-size: 12px;
    color: ${theme.color.gray1};
  }
`;
