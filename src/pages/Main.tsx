import styled from '@emotion/styled';
import { FirstContainer } from '@/components/Main/firstContainer';
import { SecondContainer } from '@/components/Main/secondContainer';
import { ThirdContainer } from '@/components/Main/thirdContainer';

export const Main = () => {
  return (
    <Wrapper>
      <FirstContainer />
      <SecondContainer />
      <ThirdContainer />
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

const SubFooter = styled.div`
  width: 100%;
  height: 540px;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(201, 153, 209, 1) 0%, rgba(198, 0, 231, 1) 100%);
  > div:nth-child(1) {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
  > div:nth-child(2) {
    font-size: 70px;
    font-weight: 700;
    text-align: center;
    margin-top: 34px;
    > b {
      color: white;
    }
  }
`;
