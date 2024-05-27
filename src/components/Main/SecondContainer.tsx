import styled from '@emotion/styled';

export const SecondContainer = () => {
  return (
    <Container>
      <LeftBox>
        <div>
          스퀘어로 애플리케이션을
          <br />
          빠르게 배포하세요.
        </div>
        <div>기능에 대해 더 알아보세요</div>
      </LeftBox>
      <RightBox>
        <DescriptionBox>
          <div>실시간 모니터링</div>
          <div>
            스퀘어는 배포한 애플리케이션을 실시간으로
            <br />
            지표를 수집하고 제공합니다.
          </div>
        </DescriptionBox>
        <DescriptionBox>
          <div>손쉬운 배포</div>
          <div>
            스퀘어는 Github Action, Dockerfile을
            <br />
            통해 간단한 설정만으로 배포할 수 있습니다.
          </div>
        </DescriptionBox>
        <DescriptionBox>
          <div>환경변수 관리</div>
          <div>
            기존 설정하기 어렵고 가시성이 부족했던
            <br />
            환경변수를 간단하게 관리할 수 있습니다.
          </div>
        </DescriptionBox>
        <DescriptionBox>
          <div>팀원 관리</div>
          <div>
            동아리, 팀, 개인 프로젝트 단위로 팀을 생성하고
            <br />
            손쉽게 팀원을 추가하여 관리할 수 있습니다.
          </div>
        </DescriptionBox>
      </RightBox>
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

const LeftBox = styled.div`
  width: 500px;
  height: 560px;
  padding: 32px 0 0 26px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: #17181a;
  > div:nth-of-type(1) {
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    margin-top: -12px;
  }
  > div:nth-of-type(2) {
    font-size: 16px;
    font-weight: 600;
    color: #9245db;
    margin-top: 40px;
    cursor: pointer;
  }
`;

const RightBox = styled.div`
  width: 700px;
  height: 560px;
  display: flex;
  flex-wrap: wrap;
`;

const DescriptionBox = styled.div`
  width: 350px;
  height: 280px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: start;
  color: #17181a;
  > div:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
  }
  > div:nth-of-type(2) {
    font-size: 16px;
    line-height: 24px;
  }
`;
