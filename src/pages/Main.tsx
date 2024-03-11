import styled from '@emotion/styled';
import MainImg from '@/assets/Main.svg';

export const Main = () => {
  return (
    <Wrapper>
      <Container>
        <img src={MainImg} />
        <MainContainer>
          <div>
            프로젝트를 빠르게
            <br />
            배포하는 경험을 할 수 있습니다.
          </div>
          <div>스퀘어는 보다 쉬운 방법으로 배포할 수 있고 쉽게 모니터링 할 수 있습니다.</div>
          <div>자세히 보기</div>
        </MainContainer>
      </Container>
      <Container>b</Container>
      <Container>c</Container>
      <SubFooter>
        <div>FREE TRIAL</div>
        <div>
          대마고 학생이라면 <b>‘스퀘어 인프라’</b> 를<br />
          <b>무료</b>로 사용할 수 있습니다.
        </div>
        <div></div>
      </SubFooter>
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
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainContainer = styled.div`
  width: 1170px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: absolute;
  top: 200px;
  left: auto;
  right: auto;
  color: white;
  > div:nth-child(1) {
    font-size: 48px;
    font-weight: 700;
  }
  > div:nth-child(2) {
    margin: 32px 0 64px 0;
    font-size: 20px;
  }
  > div:nth-child(3) {
    width: 190px;
    height: 64px;
    border: 1px white solid;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

const SubFooter = styled.div`
  width: 100%;
  height: 710px;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #6fe09e;
`;
