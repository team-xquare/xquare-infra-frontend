import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Sidebar } from '@/components/common/sidebar';
import { Tag } from '@/components/Team/Tag';

export const TeamDeployContainerDetail = () => {
  return (
    <Wrapper>
      <Sidebar />
      <ContainerWrapper>
        <Container>
          <TitleContainer>
            <TeamName>에일리언즈</TeamName>
            <Title>
              컨테이너 dms-backend
              <Tag tag="활성" />
            </Title>
            <Describtion>
              <div>team-aliens/DMS-Backend</div>
              <div>https://prod-server.xquare.app/dms</div>
              <div>마지막 배포: 2023-03-06 17:57</div>
            </Describtion>
          </TitleContainer>
          <LogContainer>
            <Label>로그</Label>
            <Log>
              <div></div>
            </Log>
          </LogContainer>
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
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Describtion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > div:nth-of-type(1) {
    font-size: 20px;
    color: ${theme.color.gray6};
  }
  > div:nth-of-type(2) {
    font-size: 16px;
    color: ${theme.color.gray6};
  }
  > div:nth-of-type(3) {
    font-size: 16px;
    color: ${theme.color.gray6};
  }
`;

const LogContainer = styled.div`
  width: 100%;
  max-width: 1120px;
`;

const Label = styled.label`
  width: 100%;
  height: 22px;
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const Log = styled.div`
  width: 100%;
  height: 332px;
  border-radius: 10px;
  border: 1px solid ${theme.color.gray4};
  > div:nth-of-type(1) {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid ${theme.color.gray4};
  }
`;
