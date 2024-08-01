import React from 'react';
import { Tag } from '@/components/Team/Tag';
import { theme } from '@/style/theme';
import { getDetailContainer } from '@/utils/apis/container';
import { getHistory } from '@/utils/apis/history';
import { ContainerDetailType } from '@/utils/types/containerType';
import { HistoryType, StageType } from '@/utils/types/historyType';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LongArrowImg from '@/assets/LongArrow.svg';
import { UnknownIcon } from '@/assets/UnknownIcon';
import { PassedIcon } from '@/assets/PassedIcon';
import { FailedIcon } from '@/assets/FailedIcon';
// import { BuildingIcon } from '@/assets/BuildingIcon';
import { Loader } from '@/components/Loader';

const Stage = ({ name, status }: StageType) => {
  const onIcon = () => {
    switch (status) {
      case 'Building':
        return <Loader />;
      case 'Failed':
        return <FailedIcon size={24} color={theme.color.errorDark1} />;
      case 'Passed':
        return <PassedIcon size={24} color={theme.color.infoDark1} />;
      case 'Unknown':
      default:
        return <UnknownIcon size={24} color={theme.color.gray4} />;
    }
  };

  return (
    <StageBox>
      {onIcon()}
      {name}
    </StageBox>
  );
};

export const TeamDeployContainerHistory = () => {
  const { deployUUID, env } = useParams();
  const [data, setData] = useState<ContainerDetailType>();
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    if (deployUUID && env) {
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });
      getHistory(deployUUID, env).then((res) => {
        setHistory(res.data.histories);
      });
    }
  }, [deployUUID, env]);

  if (data?.is_v2)
    return (
      <Wrapper>
        <div style={{ fontSize: '48px', color: theme.color.gray9, fontWeight: '700', paddingTop: '200px' }}>
          배포 내역을 조회할 수 없습니다
        </div>
        <Loader />
      </Wrapper>
    );

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>배포내역</TeamName>
        <Title>
          컨테이너 {data?.deploy_name}
          <Tag tag="AVAILABLE" />
        </Title>
      </TitleContainer>
      <DeployContainerWrapper>
        {history &&
          history.length > 0 &&
          history.map((item, index) => (
            <DeployContainer key={index}>
              <DeployInfo>
                <div>
                  <div>{item.name}</div>
                  <div>{item.email}</div>
                  <div>{item.commit_message}</div>
                </div>
                <div>{new Date(item.scheduled_date).toLocaleString()}</div>
              </DeployInfo>
              <DeployBox>
                {item.stages.map((stage, stageIndex) => (
                  <React.Fragment key={stageIndex}>
                    <Stage name={stage.name} status={stage.status} />
                    {stageIndex < item.stages.length - 1 && <img src={LongArrowImg} />}
                  </React.Fragment>
                ))}
              </DeployBox>
            </DeployContainer>
          ))}
      </DeployContainerWrapper>
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

const DeployContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 1120px;
  width: 100%;
  padding-bottom: 200px;
`;

const DeployContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

const DeployInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  color: ${theme.color.gray6};
  > div:nth-child(1) {
    display: flex;
    gap: 12px;
    > div:nth-child(1) {
      color: ${theme.color.main};
    }
  }
  > div:nth-child(2) {
  }
`;

const DeployBox = styled.div`
  width: 100%;
  height: 140px;
  border-radius: 8px;
  border: 1px solid ${theme.color.gray4};
  background-color: ${theme.color.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StageBox = styled.div`
  width: 150px;
  height: 50px;
  border-radius: 8px;
  background-color: ${theme.color.gray2};
  border: 1px solid ${theme.color.gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.color.gray8};
  gap: 24px;
`;
