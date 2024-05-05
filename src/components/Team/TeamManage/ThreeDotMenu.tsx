import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';

export const Wrapper = styled.div`
  width: 134px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px ${theme.color.gray5} solid;
  background-color: ${theme.color.gray1};
  position: absolute;
  margin-top: 8px;
  z-index: 10;
  top: 16px;
`;

export const Box = styled.div<{ isLast: string }>`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.color.gray7};
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s linear;
  ${({ isLast }) => {
    return (
      isLast === 'false' &&
      css`
        border-bottom: 1px ${theme.color.gray5} solid;
      `
    );
  }};
  :hover {
    color: ${theme.color.mainDark1};
  }
`;
