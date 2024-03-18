import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';

export const TeamCreate = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Container>
        <TitleContainer>
          <Title>팀 생성</Title>
        </TitleContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  margin-left: 60px;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 1120px;
  margin-top: 80px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #202020;
`;
