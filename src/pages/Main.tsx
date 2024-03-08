import styled from '@emotion/styled';
import MainImg from '@/assets/Main.svg';

export const Main = () => {
  return (
    <Wrapper>
      <Container>
        <img src={MainImg} />
        <FirstContainerBox>
          <div>
            프로젝트를 빠르게
            <br />
            배포하는 경험을 할 수 있습니다.
          </div>
          <div>스퀘어는 보다 쉬운 방법으로 배포할 수 있고 쉽게 모니터링 할 수 있습니다.</div>
        </FirstContainerBox>
      </Container>
      <Container>b</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const FirstContainerBox = styled.div`
  position: absolute;
  top: 200px;
  left: 214px;
  width: 922px;
  height: 690px;
  color: white;
  > div:nth-child(1) {
    font-size: 64px;
    font-weight: 800;
    margin-top: 20px;
  }
  > div:nth-child(2) {
    font-size: 30px;
    font-weight: 500;
    margin-top: 50px;
  }
`;
