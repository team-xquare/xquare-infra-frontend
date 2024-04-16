import { XButton } from '@/components/common/XButton';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const link = useNavigate();

  return (
    <Wrapper>
      <ErrorCode>404</ErrorCode>
      <Container>
        <Center>
          잘못된 접근 경로입니다
          <XButton
            buttonStyle="solid"
            width={120}
            height={48}
            onClick={() => {
              link('/');
            }}
          >
            메인 화면으로
          </XButton>
        </Center>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  font-size: 48px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ErrorCode = styled.div`
  font-size: 700px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.1);
`;
