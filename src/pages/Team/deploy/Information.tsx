import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Sidebar } from '@/components/common/sidebar';
import { Tag } from '@/components/Team/Tag';

export const TeamDeployInformation = () => {
  return (
    <Wrapper>
      <Sidebar />
      <ContainerWrapper>
        <Container>
          <TitleContainer>
            <TeamName>에일리언즈 / dms-frontend</TeamName>
            <Title>배포 관리</Title>
            <Describtion>프로젝트에 대한 정보를 관리합니다.</Describtion>
          </TitleContainer>
          <InformationContainer>
            <Information>
              <div>한줄 설명</div>
              <div>DMS 프론트엔드 프로젝트입니다.</div>
            </Information>
            <Information>
              <div>Github Repository</div>
              <div>https://github.com/team-aliens/DMS-Backend</div>
            </Information>
            <Information>
              <div>프로젝트 상위 경로</div>
              <div>/</div>
            </Information>
            <Information>
              <div>상태 (관리자 승인 후 배포 가능)</div>
              <div>
                <Tag tag="활성" />
              </div>
            </Information>
          </InformationContainer>
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px + 200px);
  padding-left: 100px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
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
`;

const Information = styled.div`
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
