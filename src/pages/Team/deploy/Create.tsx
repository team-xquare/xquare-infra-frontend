import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Sidebar } from '@/components/common/sidebar';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { XButton } from '@/components/common/XButton';

const deployType: string[] = ['frontend', 'backend'];
const databaseType: string[] = ['mysql', 'redis'];

export const TeamDeployCreate = () => {
  const [deploySeleted, setDeploySelected] = useState<number | undefined>();
  const [databaseSeleted, setDatabaseSelected] = useState<number | undefined>();

  return (
    <Wrapper>
      <Sidebar />
      <ContainerWrapper>
        <Container>
          <TitleContainer>
            <Title>배포 생성</Title>
          </TitleContainer>
          <Form>
            <InputWrapper>
              <Input width={328} label="배포 이름 (영어)" placeholder="배포 이름 (영어)" />
              <Input width={426} label="깃허브 Organization 이름" placeholder="team-xquare" />
              <Input width={426} label="깃허브 Repository 이름" placeholder="example-backend" />
              <SelectBar
                selectedIndex={deploySeleted}
                onSelect={setDeploySelected}
                values={deployType}
                label="배포 타입"
              />
              <SelectBar
                canCancle={true}
                placehold="사용하지 않음"
                selectedIndex={databaseSeleted}
                onSelect={setDatabaseSelected}
                values={databaseType}
                label="DB 사용여부"
              />
              <Input width={426} label="프로젝트 상위 경로" placeholder="/" />
              <Input width={426} label="한줄 설명" placeholder="이러이러한 프로젝트입니다." />
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
      </ContainerWrapper>
    </Wrapper>
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

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
