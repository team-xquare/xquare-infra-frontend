import { Tag } from '@/components/Team/Tag';
import { theme } from '@/style/theme';
import { getDetailContainer } from '@/utils/apis/container';
import { getHistory } from '@/utils/apis/history';
import { ContainerDetailType } from '@/utils/types/containerType';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const TeamDeployContainerHistory = () => {
  const { deployUUID, env } = useParams();
  const [data, setData] = useState<ContainerDetailType>();

  useEffect(() => {
    if (deployUUID && env) {
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (deployUUID && env) {
      getHistory(deployUUID, env).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>배포내역</TeamName>
        <Title>
          컨테이너 {data?.deploy_name}
          <Tag tag={'AVAILABLE'} />
        </Title>
      </TitleContainer>
      <DeployContainerWrapper>
        <DeployContainer>
          <DeployInfo>
            <div>
              <div>HyunSu1768</div>
              <div>
                {'<'}azxcv1768@gmail.com{'>'}
              </div>
              <div>feat :: 몰라</div>
            </div>
            <div>2024년 7월 29일 11시 02분</div>
          </DeployInfo>
          <DeployBox>Hello</DeployBox>
        </DeployContainer>
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
  max-width: 1120px;
  width: 100%;
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
