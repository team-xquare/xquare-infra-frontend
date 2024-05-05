import { theme } from '@/style/theme';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  > div {
    width: 478px;
  }
  > div:nth-of-type(1) {
    font-size: 20px;
    font-weight: 600;
    color: ${theme.color.gray8};
  }
  > div:nth-of-type(2) {
    font-size: 18px;
    font-weight: 500;
    color: ${theme.color.gray7};
  }
  > div:nth-of-type(3) {
    display: flex;
    justify-content: end;
    gap: 10px;
  }
`;
