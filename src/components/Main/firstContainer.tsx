import styled from '@emotion/styled';
import MainImg from '@/assets/Main.svg';

export const FirstContainer = () => {
  return (
    <Container>
      <ImgWrapper>
        <Img src={MainImg} />
      </ImgWrapper>
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
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const MainContainer = styled.div`
  width: 1170px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: absolute;
  top: 250px;
  left: auto;
  right: auto;
  color: white;
  z-index: 3;
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

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3); /* 빨간색으로 변경 */
    z-index: 2;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;
