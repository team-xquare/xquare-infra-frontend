import { Tag } from '@/components/Team/Tag';
import { theme } from '@/style/theme';
import { getDetailContainer } from '@/utils/apis/container';
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

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>배포내역</TeamName>
        <Title>
          컨테이너 {data?.deploy_name}
          <Tag tag={'AVAILABLE'} />
        </Title>
      </TitleContainer>
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
