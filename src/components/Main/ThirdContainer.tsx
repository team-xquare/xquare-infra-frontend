import styled from '@emotion/styled';
import DockerImg from '@/assets/Docker.svg';

export const ThirdContainer = () => {
  return (
    <Container>
      <Text>지원 플랫폼</Text>
      <CardContainer>
        <CardBox>
          <div>
            <img src={DockerImg} />
          </div>
          <div>Dockerfile</div>
          <div>
            스퀘어에서는 Dockefile을 통해
            <br />
            어플리케이션을 컨테이너화할 수 있다면
            <br />
            어떤 어플리케이션이든 배포할 수 있으며
            <br />
            개발자는 다양한 환경에 대해 고민할
            <br />
            필요 없이 배포에 집중할 수 있습니다.
          </div>
        </CardBox>
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Text = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 138px;
  text-align: center;
`;

const CardContainer = styled.div`
  height: 472px;
  margin-top: 92px;
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const CardBox = styled.div`
  width: 274px;
  height: 472px;
  border: 1px #dcd5e4 solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 208px;
    height: 192px;
    border-bottom: 1px #dcd5e4 solid;
    > img {
      width: 208px;
    }
  }
  > div:nth-of-type(2) {
    font-size: 20px;
    font-weight: 700;
    margin-top: 26px;
  }
  > div:nth-of-type(3) {
    font-size: 16px;
    margin-top: 22px;
    text-align: center;
    line-height: 24px;
  }
`;
