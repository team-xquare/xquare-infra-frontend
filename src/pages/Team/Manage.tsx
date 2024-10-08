import { useState, useEffect } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useModal } from '@/hooks/useModal';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { SearchBar } from '@/components/common/SearchBar';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { Tag } from '@/components/Team/Tag';
import * as MemberAddModal from '@/components/Team/TeamManage/MemberAddModal';
import * as MemberManageModal from '@/components/Team/TeamManage/MemberManageModal';
import * as ThreeDotMenu from '@/components/Team/TeamManage/ThreeDotMenu';
import { useParams } from 'react-router-dom';
import { teamMemberDelete, teamMemberPut, teamDetailCheck } from '@/utils/apis/team';
import { getUser } from '@/utils/apis/user';
import { UserType } from '@/utils/types/userType';
import Spinner from '@/components/spinner';
import { Conditional } from '@/components/Headless/Conditional';

export const TeamManage = () => {
  const { teamUUID } = useParams();
  const [isOpen, setIsOpen] = useState<number | boolean>(false);
  const [users, setUsers] = useState<UserType[]>();
  const [userNames, setUserNames] = useState<string[]>();
  const [teamMember, setTeamMember] = useState<string[]>();
  const [selectedMamberName, setSelectedMemberName] = useState<string>();
  const [selectedMemberUUID, setSelectedMemberUUID] = useState<string>();
  const [selectedStudent, setSelectedStudent] = useState<string[]>([]);
  const { data, isLoading, refetch } = teamDetailCheck(teamUUID);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  const { isVisible, onShow, ModalWrapper, onClose } = useModal();
  const { Wrapper: ManageWrapper, Render, Loading, Empty } = Conditional();

  useEffect(() => {
    if (!data) return;
    setTeamMember(data.member_list.map((item: any) => `${item.member_number} ${item.member_name}`));
  }, [data]);

  useEffect(() => {
    getUser().then((res) => {
      setUsers(res.data);
      setUserNames(res.data.map((item: any) => item.number_and_name));
    });
  }, []);

  const onOpen = (index: number) => {
    if (!isOpen) setIsOpen(index);
  };

  const onMemberDelete = () => {
    if (!teamUUID || !selectedMemberUUID) return;

    teamMemberDelete(teamUUID, selectedMemberUUID)
      .then(() => {
        refetch().finally(onClose);
      })
      .catch(() => {
        onClose();
      });
  };

  const onMemberAdd = () => {
    if (!users || !teamUUID) return;

    const newArr: string[] = users
      .filter((user) => selectedStudent.includes(user.number_and_name))
      .map((user) => {
        return user.user_id;
      });

    teamMemberPut(teamUUID, newArr)
      .then(() => {
        refetch().finally(onClose);
      })
      .catch(onClose);
  };

  return (
    <ManageWrapper
      data={data}
      isLoading={isLoading}
      emptyFunction={(data) => data === undefined}
      renderComponent={
        <Render>
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
                    {userNames &&
                      teamMember &&
                      userNames
                        .filter((member) => !teamMember.includes(member))
                        .map((member, index) => {
                          return (
                            <MemberBox
                              key={index}
                              style={{ cursor: 'pointer' }}
                              isSelected={selectedStudent.includes(member)}
                              onClick={() => {
                                if (selectedStudent.includes(member)) {
                                  const newArr = selectedStudent.filter((student) => student !== member);
                                  setSelectedStudent(newArr);
                                } else {
                                  setSelectedStudent([...selectedStudent, member]);
                                }
                              }}
                            >
                              {member}
                            </MemberBox>
                          );
                        })}
                  </MemberAddModal.MiddleContainer>
                  <MemberAddModal.BottomContainer>
                    <div>
                      {selectedStudent &&
                        selectedStudent.map((student, index) => {
                          return (
                            <>
                              {index <= 2 && <>{student.split(' ')[1]}</>}
                              {index < selectedStudent.length - 1 && index <= 1 && <>, </>}
                            </>
                          );
                        })}
                      {selectedStudent.length > 3 && <> 등 {selectedStudent.length - 3}명</>}
                    </div>
                    <XButton buttonStyle="solid" width={100} height={50} onClick={onMemberAdd}>
                      팀원 추가
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
                  <div>{selectedMamberName} 학생을 팀에서 삭제하시겠습니까?</div>
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
                    <XButton
                      width={100}
                      height={50}
                      buttonStyle="solid"
                      onClick={() => {
                        onMemberDelete();
                      }}
                    >
                      팀원 삭제
                    </XButton>
                  </div>
                </MemberManageModal.Wrapper>
              </ModalWrapper>
            )}
            <Wrapper>
              <TitleContainer>
                <TeamName>{data?.team_name_ko}</TeamName>
                <Title>팀 관리</Title>
                <Describtion>팀 정보를 관리해보세요</Describtion>
              </TitleContainer>
              <InformationContainer>
                <div>
                  <div>{data?.team_name_ko}</div>
                  <div>{data?.team_name_en}</div>
                </div>
                <div>
                  <div>팀원 수 : {data?.member_count}</div>
                  <div>생성자 : {data?.admin_name}</div>
                  <div>생성일 : {data?.created_at.split('T')[0]}</div>
                </div>
              </InformationContainer>
              <MemberContainer>
                <div>팀원</div>
                <div>
                  <SearchBar width={336} placeholder="팀원 검색" />
                  {data?.is_admin && (
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
                  )}
                </div>
                <MemberBoxContainer>
                  {data?.member_list.map((member, index) => {
                    return (
                      <MemberBox key={index} isSelected={false}>
                        <div>
                          <div>
                            {member.member_number} {member.member_name}
                          </div>
                          {member.member_role === 'ADMINISTRATOR' && <Tag tag="manage" />}
                        </div>
                        <MemberBoxInRightContainer ref={ref}>
                          <>
                            {data.is_admin && (
                              <>
                                <Icon
                                  icon={'bi:three-dots-vertical'}
                                  color="#999999"
                                  width={20}
                                  height={20}
                                  cursor={'pointer'}
                                  onClick={() => {
                                    onOpen(index);
                                    setSelectedMemberUUID(member.user_id);
                                    setSelectedMemberName(`${member.member_number} ${member.member_name}`);
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
                              </>
                            )}
                          </>
                        </MemberBoxInRightContainer>
                      </MemberBox>
                    );
                  })}
                </MemberBoxContainer>
              </MemberContainer>
            </Wrapper>
          </>
        </Render>
      }
      emptyComponent={<Empty>not rendered</Empty>}
      loadingComponent={
        <Loading>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '240px',
            }}
          >
            <Spinner />
          </div>
        </Loading>
      }
    />
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`;

const MemberBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  max-width: 1042px;
  height: 60px;
  flex: none;
  border-radius: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ isSelected }) => (isSelected ? theme.color.main : theme.color.gray4)};
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
