import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { Tag } from '@/components/Team/Tag';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDeploy } from '@/utils/apis/deploy';
import { DeployAllType } from '@/utils/types/deploy';

export const TeamDeploy = () => {
  const { teamUUID } = useParams();
  const [data, setData] = useState<DeployAllType>();
  const link = useNavigate();

  useEffect(() => {
    if (!teamUUID) return;

    getAllDeploy(teamUUID).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>에일리언즈</TeamName>
        <Title>배포</Title>
        <Describtion>프로젝트를 등록하고 해당 프로젝트에 대한 배포 액션을 설정할 수 있습니다.</Describtion>
        <UtilContainer>
          <SearchBar width={312} placeholder="프로젝트 검색" />
          <XButton width={138} height={50} buttonStyle="solid" onClick={() => link(`/team/${teamUUID}/deploy/create`)}>
            <Icon icon={'ic:round-plus'} width={20} height={20} />
            프로젝트 등록
          </XButton>
        </UtilContainer>
      </TitleContainer>
      <DeployBoxContainer>
        {data &&
          data.deploy_list.map((item, index) => (
            <DeployBox key={index} onClick={() => link(`/team/${teamUUID}/deploy/${item.deploy_id}`)}>
              <div>
                {item.deploy_name}
                <Tag tag={item.deploy_status} />
              </div>
              <div>{item.repository}</div>
            </DeployBox>
          ))}
      </DeployBoxContainer>
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
`;

const Describtion = styled.div`
  font-size: 24px;
  font-weight: 100;
  color: ${theme.color.gray8};
`;

const UtilContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > :last-of-type {
    display: flex;
    gap: 10px;
  }
`;

const DeployBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DeployBox = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 1120px;
  height: 100px;
  border-radius: 6px;
  border: 1px solid ${theme.color.gray5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 0 38px;
  > div:nth-of-type(1) {
    display: flex;
    gap: 6px;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.gray8};
  }
  > div:nth-of-type(2) {
    font-size: 20px;
    color: ${theme.color.gray6};
  }
`;
