import styled from '@emotion/styled';
import { Input } from '@/components/common/Input';
import { XButton } from '@/components/common/XButton';

export const Login = () => {
  return (
    <Wrapper>
      <Title>Xquare에 로그인</Title>
      <InputContainer>
        <Input label="이메일" width={326} />
        <Input label="암호" width={326} type="password" />
      </InputContainer>
      <ButtonContainer>
        <XButton width={100} height={50}>
          로그인
        </XButton>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px + 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding-top: 180px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  width: 326px;
  display: flex;
  justify-content: end;
`;
