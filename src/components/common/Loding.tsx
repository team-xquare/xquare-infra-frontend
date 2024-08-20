import { theme } from '@/style/theme';
import styled from '@emotion/styled';

const LoadingIndicatorStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SpinnerStyle = styled.div<{ size: number }>`
  border: 4px solid ${theme.color.gray3};
  border-top: 4px solid ${theme.color.main};
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ size = 40 }: { size?: number }) => {
  return (
    <LoadingIndicatorStyle>
      <SpinnerStyle size={size} />
    </LoadingIndicatorStyle>
  );
};

export default Loading;
