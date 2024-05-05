import { useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useModal } from '@/hooks/useModal';
import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';
import { theme } from '@/style/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { Tag } from '@/components/Team/Tag';
import * as MemberAddModal from '@/components/Team/TeamManage/MemberAddModal';
import * as MemberManageModal from '@/components/Team/TeamManage/MemberManageModal';
import * as ThreeDotMenu from '@/components/Team/TeamManage/ThreeDotMenu';

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
  const [isOpen, setIsOpen] = useState<number | boolean>(false);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  const { isVisible, onShow, ModalWrapper, onClose } = useModal();

  const onOpen = (index: number) => {
    if (!isOpen) setIsOpen(index);
  };

  return (
    <>
      {isVisible === 'memberAdd' && (
        <ModalWrapper width={548} height={648}>
          <MemberAddModal.Wrapper>
            <MemberAddModal.TopContainer>
              <div>
                팀원 추가
                <Icon
                  icon={'bitcoin-icons:cross-filled'}
                  width={24}
                  height={24}
                  color="#343434"
                  cursor={'pointer'}
                  onClick={onClose}
                />
              </div>
              <SearchBar width={214} placeholder="학생 검색" />
            </MemberAddModal.TopContainer>
            <MemberAddModal.MiddleContainer>
              {dummyMember.map((member, index) => (
                <MemberBox key={index}>{member}</MemberBox>
              ))}
            </MemberAddModal.MiddleContainer>
            <MemberAddModal.BottomContainer>
              <div>홍길동, 이름김, 테스트 등 3명</div>
              <XButton buttonStyle="solid" width={100} height={50}>
                담당자 변경
              </XButton>
            </MemberAddModal.BottomContainer>
          </MemberAddModal.Wrapper>
        </ModalWrapper>
      )}
      {isVisible === 'managerChange' && (
        <ModalWrapper width={538} height={200}>
          <MemberManageModal.Wrapper>
            <div>담당자 변경</div>
            <div>담당자를 김은빈 학생에서 홍길동 학생으로 변경하시겠습니까?</div>
            <div>
              <XButton
                width={58}
                height={50}
                buttonStyle="ghost"
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </XButton>
              <XButton width={100} height={50} buttonStyle="solid">
                담당자 변경
              </XButton>
            </div>
          </MemberManageModal.Wrapper>
        </ModalWrapper>
      )}
      {isVisible === 'memberDel' && (
        <ModalWrapper width={538} height={200}>
          <MemberManageModal.Wrapper>
            <div>팀원 삭제</div>
            <div>김은빈 학생을 팀에서 삭제하시겠습니까?</div>
            <div>
              <XButton
                width={58}
                height={50}
                buttonStyle="ghost"
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </XButton>
              <XButton width={100} height={50} buttonStyle="solid">
                팀원 삭제
              </XButton>
            </div>
          </MemberManageModal.Wrapper>
        </ModalWrapper>
      )}
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
                  <MemberBox key={index}>
                    <div>
                      <div>{member}</div>
                      <Tag tag="manage" />
                    </div>
                    <MemberBoxInRightContainer ref={ref}>
                      <Icon
                        icon={'bi:three-dots-vertical'}
                        color="#999999"
                        width={20}
                        height={20}
                        cursor={'pointer'}
                        onClick={() => {
                          onOpen(index);
                        }}
                      />
                      {isOpen === index && (
                        <ThreeDotMenu.Wrapper>
                          <ThreeDotMenu.Box
                            isLast={'false'}
                            onMouseDown={() => {
                              onShow('managerChange');
                            }}
                          >
                            담당자 지정
                          </ThreeDotMenu.Box>
                          <ThreeDotMenu.Box
                            isLast={'true'}
                            onMouseDown={() => {
                              onShow('memberDel');
                            }}
                          >
                            팀원 삭제
                          </ThreeDotMenu.Box>
                        </ThreeDotMenu.Wrapper>
                      )}
                    </MemberBoxInRightContainer>
                  </MemberBox>
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
  > div:nth-of-type(3) {
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
  > div:first-of-type {
    display: flex;
    gap: 8px;
    align-items: center;
    > div:first-of-type {
      font-size: 20px;
      font-weight: 500;
      color: ${theme.color.gray8};
    }
  }
`;

const MemberBoxInRightContainer = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
`;
