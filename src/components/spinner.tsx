import { theme } from '@/style/theme';
import styled from '@emotion/styled';

const _Spinner = styled.div`
  border: 4px solid #f3f3f3; /* 배경색 */
  border-top: 4px solid ${theme.color.main};
  border-radius: 50%;
  width: 60px;
  height: 60px;
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

const Spinner = () => {
  return <_Spinner />;
};

export default Spinner;
