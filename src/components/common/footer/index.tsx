import styled from '@emotion/styled';
import Logo from '@/assets/LogoText.svg';

export const Footer = () => {
  return (
    <Wrapper>
      <img src={Logo} width={150} />
      <RightContainer>
        <InfoContainer>
          <span>소개</span>
          <InfoItemContainer>
            <span>스퀘어 인프라</span>
            <span>사용법 소개</span>
          </InfoItemContainer>
        </InfoContainer>
        <InfoContainer>
          <span>지원</span>
          <InfoItemContainer>
            <span>지원</span>
          </InfoItemContainer>
        </InfoContainer>
      </RightContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 60px 0;
  width: 100%;
  height: 544px;
  background-color: #17181a;
  z-index: 11;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 60px;
  color: white;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  & > span {
    color: #747476;
    font-weight: bold;
  }
`;

const InfoItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
