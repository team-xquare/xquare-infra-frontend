import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Tag } from '@/components/Team/Tag';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetailDeploy } from '@/utils/apis/deploy';
import { DeployDetailType } from '@/utils/types/deploy';

export const TeamDeployInformation = () => {
  const { deployUUID } = useParams();
  const [data, setData] = useState<DeployDetailType>();

  useEffect(() => {
    if (!deployUUID) return;

    getDetailDeploy(deployUUID).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Wrapper>
      {data && (
        <>
          <TitleContainer>
            <TeamName>
              {data.team_name_ko} / {data.team_name_en}
            </TeamName>
            <Title>배포 관리</Title>
            <Describtion>프로젝트에 대한 정보를 관리합니다.</Describtion>
          </TitleContainer>
          <InformationContainer>
            <Information>
              <div>한줄 설명</div>
              <div>{data.one_line_description}</div>
            </Information>
            <Information>
              <div>Github Repository</div>
              <div>
                https://github.com/{data.team_name_en}/{data.repository}
              </div>
            </Information>
            <Information>
              <div>프로젝트 상위 경로</div>
              <div>{data.project_root_dir}</div>
            </Information>
            <Information>
              <div>상태 (관리자 승인 후 배포 가능)</div>
              <div>
                <Tag tag={data.deploy_status} />
              </div>
            </Information>
          </InformationContainer>
        </>
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
  margin-top: 80px;
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

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 1120px;
`;

const Information = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  > div:nth-of-type(1) {
    width: 300px;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.gray6};
  }
  > div:nth-of-type(2) {
    font-family: 20px;
    font-weight: 400;
    color: ${theme.color.gray6};
  }
`;
