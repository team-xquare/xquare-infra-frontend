import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';
import { theme } from '@/style/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { XButton } from '@/components/common/XButton';
import { useModal } from '@/hooks/useModal';

const dummyMember: string[] = [
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
  '0000 테스트',
];

export const TeamManage = () => {
  const { isVisible, onShow, ModalWrapper } = useModal();

  return (
    <>
      {isVisible === 'memberAdd' && (
        <ModalWrapper width={548} height={648}>
          hello
        </ModalWrapper>
      )}
      {/* {isVisible === 'memberDel' && <ModalWrapper>bye</ModalWrapper>}
      {isVisible === 'managerChange' && <ModalWrapper>good</ModalWrapper>} */}
      <Wrapper>
        <Sidebar />
        <ContainerWrapper>
          <Container>
            <TitleContainer>
              <TeamName>에일리언즈</TeamName>
              <Title>팀 관리</Title>
              <Describtion>팀 정보를 관리해보세요</Describtion>
            </TitleContainer>
            <InformationContainer>
              <div>
                <div>에일리언즈</div>
                <div>team-aliens</div>
              </div>
              <div>
                <div>팀원 수 : 10</div>
                <div>생성자 : 8기 김은빈</div>
                <div>생성일 : 2023-10-10</div>
              </div>
            </InformationContainer>
            <MemberContainer>
              <div>팀원</div>
              <div>
                <SearchBar width={336} placeholder="팀원 검색" />
                <XButton
                  width={88}
                  height={50}
                  buttonStyle="solid"
                  onClick={() => {
                    onShow('memberAdd');
                  }}
                >
                  팀원 추가
                </XButton>
              </div>
              <MemberBoxContainer>
                {dummyMember.map((member, index) => (
                  <MemberBox key={index}>{member}</MemberBox>
                ))}
              </MemberBoxContainer>
            </MemberContainer>
          </Container>
        </ContainerWrapper>
      </Wrapper>
    </>
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
  width: 100%;
  max-width: 1120px;
  height: 104px;
  background-color: ${theme.color.gray1};
  border-radius: 6px;
  border: 1px solid ${theme.color.gray5};
  padding: 20px 38px;
  display: flex;
  justify-content: space-between;
  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > div:nth-of-type(1) {
      font-size: 20px;
      font-weight: 600;
      color: ${theme.color.gray8};
    }
    > div:nth-of-type(2) {
      font-size: 18px;
      font-weight: 400;
      color: ${theme.color.gray6};
    }
  }
  > :nth-of-type(2) {
    > div {
      font-size: 18px;
      font-weight: 400;
      color: ${theme.color.gray6};
    }
  }
`;

const MemberContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 544px;
  background-color: ${theme.color.gray1};
  border-radius: 6px;
  border: 1px solid ${theme.color.gray5};
  padding: 20px 38px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  & ::-webkit-scrollbar {
    width: 4px;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
  }
  > div:nth-of-type(1) {
    font-size: 20px;
    font-weight: 500;
  }
  > div:nth-of-type(2) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  > div:nth-child(3) {
    width: 100%;
    max-width: 1042px;
  }
`;

const MemberBoxContainer = styled.div`
  width: 100%;
  height: 408px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`;

const MemberBox = styled.div`
  width: 100%;
  max-width: 1042px;
  height: 60px;
  flex: none;
  border-radius: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.color.gray4};
`;
