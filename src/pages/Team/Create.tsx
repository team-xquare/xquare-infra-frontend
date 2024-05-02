import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Sidebar } from '@/components/common/sidebar';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { useState } from 'react';
import { XButton } from '@/components/common/XButton';
import { DropMenu } from '@/components/common/DropMenu';
import { theme } from '@/style/theme';
import { Icon } from '@iconify/react';

type ProjectType = '동아리' | '팀 프로젝트' | '개인 프로젝트' | '기타';
const projectKinds: ProjectType[] = ['동아리', '팀 프로젝트', '개인 프로젝트', '기타'];

const dummyStudent: string[] = [
  '2101 김명진',
  '2102 김민재',
  '2103 김승원',
  '2104 김어진',
  '2105 김준화',
  '2107 박예빈',
  '2108 변정현',
  '2114 이태영',
  '2201 김가은',
  '2208 부현수',
  '2222 박의엘',
  '5555 남궁윤교',
];

export const TeamCreate = () => {
  const [array, setArray] = useState<string[]>(dummyStudent);
  const [selectedIndex, setSelectIndex] = useState<number>();
  const [studentIndex, setStudentIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [studentAddition, setStudentAddition] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string[]>();
  const [teamStudent, setTeamStudent] = useState<string[]>([]);
  const addInputRef = useRef<HTMLInputElement>(null);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentAddition(e.target.value);
    setIsOpen(false);
  };

  const onInsert = () => {
    if (!teamStudent || !selectedStudent) return;
    const newArr: string[] = [...teamStudent, ...selectedStudent];

    setSelectedStudent([]);
    setTeamStudent(newArr);
    console.log(newArr);
  };

  const onTeamStudentDelete = (index: number) => {
    const newArr = [...teamStudent.slice(0, index), ...teamStudent.slice(index + 1)];
    setTeamStudent(newArr);
  };

  const onDelete = (index: number) => {
    const newArr: string[] | undefined = selectedStudent?.splice(index - 1, 1);
    if (!newArr) return;
    setArray(newArr);
  };

  const onKeydownBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (selectedStudent && e.code === 'Backspace' && studentAddition.length === 0) {
      onDelete(selectedStudent.length - 1);
      addInputRef.current?.focus();
    }
  };

  const chunkAddTag = () => {
    const addInput = (
      <AddInput
        placeholder="학생 검색"
        value={studentAddition}
        onChange={onChange}
        onKeyDown={onKeydownBackspace}
        selectedStudent={selectedStudent ? selectedStudent.length : 0}
        ref={addInputRef}
      />
    );

    if (!selectedStudent || selectedStudent.length === 0) return addInput;

    const addTag = (element: string, index: number) => {
      return (
        <AddTag
          onClick={() => {
            onDelete(index);
          }}
          key={`tag-${index}`}
        >
          {element}
        </AddTag>
      );
    };

    const addTagWrapper = (children: React.ReactNode, wrapperIndex: number) => {
      return <AddTagWrapper key={`wrapper-${wrapperIndex}`}>{children}</AddTagWrapper>;
    };

    if (selectedStudent.length === 0) {
      return addInput;
    } else {
      const wrappedTags: React.ReactNode[] = [];
      const childrenArr: React.ReactNode[] = [];
      let wrapperIndex = 0;

      for (let i = 1; i <= selectedStudent.length; i++) {
        childrenArr.push(addTag(selectedStudent[i - 1], i));

        if (i % 3 === 0) {
          wrappedTags.push(addTagWrapper([...childrenArr], wrapperIndex++));
          childrenArr.splice(0, childrenArr.length);
        }
      }
      wrappedTags.push([...childrenArr]);
      wrappedTags.push(addInput);

      return wrappedTags;
    }
  };

  useEffect(() => {
    if (studentAddition.length === 0) return;

    const newArrIndex: number[] = [];
    const filteredDummyStudent = dummyStudent.filter(
      (dummy) => !selectedStudent?.includes(dummy) && !teamStudent?.includes(dummy),
    );

    filteredDummyStudent.forEach((dummy, index) => {
      if (newArrIndex.length >= 5) return;

      if (dummy.includes(studentAddition)) {
        newArrIndex.push(index);
      }
    });

    const newArr: string[] = newArrIndex.map((index) => filteredDummyStudent[index]);

    if (studentAddition !== '' && newArr.length > 0) {
      const timer = setTimeout(() => {
        setArray(newArr);
        setIsOpen(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [studentAddition]);

  useEffect(() => {
    if (studentIndex === -1) return;

    if (selectedStudent) {
      setSelectedStudent([...selectedStudent, array[studentIndex]]);
    } else {
      setSelectedStudent([array[studentIndex]]);
    }

    setStudentIndex(-1);
    setStudentAddition('');
  }, [studentIndex]);

  return (
    <Wrapper>
      <Sidebar />
      <Container>
        <TitleContainer>
          <Title>팀 생성</Title>
        </TitleContainer>
        <Form>
          <InputWrapper>
            <Input width={400} label="팀 이름(한글)" placeholder="팀 이름(한글)" />
            <Input width={400} label="팀 이름(영어)" placeholder="팀 이름(영어)" />
            <SelectBar selectedIndex={selectedIndex} onSelect={setSelectIndex} values={projectKinds} label="팀 분류" />
            <TeamAddWrapper>
              <div>
                <AddInputContainer ref={ref}>
                  <AddLabel>팀원</AddLabel>
                  <AddInputWrapper selectedStudent={selectedStudent ? selectedStudent.length : 0}>
                    {chunkAddTag()}
                    {/* {selectedStudent?.map((element, index) => {
                    return <AddTag key={index}>{element}</AddTag>;
                  })}
                  <AddInput
                    placeholder="학생 검색"
                    value={studentAddition}
                    onChange={onChange}
                    selectedStudent={selectedStudent.length}
                  /> */}
                  </AddInputWrapper>
                  {isOpen && (
                    <DropMenu values={array} onClose={setIsOpen} onSelect={setStudentIndex} selectedIndex={-1} />
                  )}
                </AddInputContainer>
                <XButton width={88} height={46} buttonStyle="solid" onClick={onInsert}>
                  학생 추가
                </XButton>
              </div>
              <div>
                {teamStudent.map((student, index) => {
                  return (
                    <AddedStudent key={index}>
                      {student}
                      <div
                        onClick={() => {
                          onTeamStudentDelete(index);
                        }}
                      >
                        <Icon icon={'bitcoin-icons:cross-filled'} width={18} height={18} />
                      </div>
                    </AddedStudent>
                  );
                })}
              </div>
            </TeamAddWrapper>
          </InputWrapper>
          <ButtonWrapper>
            <XButton width={58} height={50} buttonStyle="ghost">
              취소
            </XButton>
            <XButton width={84} height={50} buttonStyle="solid">
              생성하기
            </XButton>
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  padding-left: 100px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin-top: 80px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #202020;
  cursor: default;
`;

const TeamAddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  > div:nth-of-type(1) {
    display: flex;
    align-items: end;
    gap: 10px;
  }
  > div:nth-of-type(2) {
    width: 508px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const AddedStudent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.gray1};
  color: ${theme.color.gray7};
  border: 1px solid ${theme.color.gray5};
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  gap: 12px;
  padding: 10px 20px;
  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
  gap: 20px;
`;

const Form = styled.div`
  margin-top: 56px;
  max-width: 1120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const AddInputContainer = styled.div`
  width: 400px;
  min-height: 74px;
  position: relative;
`;

const AddLabel = styled.label`
  width: 100%;
  height: 22px;
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const AddInputWrapper = styled.div<{ selectedStudent: number }>`
  border-radius: 4px;
  width: 100%;
  padding: 0 16px;
  height: ${({ selectedStudent }) => {
    return `${46 + Math.floor(selectedStudent / 3) * 46}px`;
  }};
  background-color: ${theme.color.gray1};
  border: 1px solid ${theme.color.gray5};
  display: flex;
  align-items: start;
  gap: 16px;
  row-gap: 0;
  flex-wrap: wrap;
`;

const AddTagWrapper = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddInput = styled.input<{ selectedStudent: number }>`
  height: 44px;
  font-size: 16px;
  font-weight: 400;
  &::placeholder {
    color: ${theme.color.gray5};
  }
  width: ${({ selectedStudent }) => `calc(100% - ${(selectedStudent % 3) * 82}px - ${(selectedStudent % 3) * 16}px)`};
`;

const AddTag = styled.div`
  cursor: pointer;
  width: 82px;
  height: 34px;
  padding: 4px 0;
  background-color: ${theme.color.gray3};
  color: ${theme.color.gray6};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 5px 0;
  transition: 0.1s linear;
  &:hover {
    opacity: 0.7;
  }
`;
