import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { useState } from 'react';

type ProjectType = '동아리' | '팀 프로젝트' | '개인 프로젝트' | '기타';
const projectKinds: ProjectType[] = ['동아리', '팀 프로젝트', '개인 프로젝트', '기타'];

export const TeamCreate = () => {
  const [selectedIndex, setSelectIndex] = useState<number>();

  return (
    <Wrapper>
      <Sidebar />
      <Container>
        <TitleContainer>
          <Title>팀 생성</Title>
        </TitleContainer>
        <Form>
          <Input width={400} label="팀 이름(한글)" placeholder="팀 이름(한글)" />
          <Input width={400} label="팀 이름(영어)" placeholder="팀 이름(영어)" />
          <SelectBar selectedIndex={selectedIndex} onSelect={setSelectIndex} values={projectKinds} label="팀 분류" />
          <div>hello world</div>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  margin-left: 60px;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 1120px;
  margin-top: 80px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #202020;
  cursor: default;
`;

const Form = styled.div`
  margin-top: 56px;
  width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 24px;
`;
