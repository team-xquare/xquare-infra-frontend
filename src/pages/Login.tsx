import styled from '@emotion/styled';
import { Input } from '@/components/common/Input';
import { XButton } from '@/components/common/XButton';
import { useState } from 'react';
import { login, signup } from '@/utils/apis/auth';

export const Login = () => {
  const [data, setData] = useState<{ account_id: string; password: string }>({ account_id: '', password: '' });

  const { account_id, password } = data;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onLogin = () => {
    login(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          const email: string | null = prompt('회원가입이 되지 않았습니다.\n이메일을 입력해주세요');
          console.log(123);

          if (email == null) return;
          console.log(456);

          signup({ ...data, email: email })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  return (
    <Wrapper>
      <Title>Xquare에 로그인</Title>
      <InputContainer>
        <Input label="아이디" width={326} value={account_id} onChange={onChange} name="account_id" />
        <Input label="암호" width={326} type="password" value={password} onChange={onChange} name="password" />
      </InputContainer>
      <ButtonContainer>
        <XButton width={100} height={50} onClick={onLogin}>
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
