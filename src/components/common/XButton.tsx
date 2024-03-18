import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { css } from '@emotion/react';

type ButtonStyleType = 'solid' | 'ghost';

type ButtonPropsType = {
  buttonStyle: ButtonStyleType;
  width: number;
  height: number;
  children: ReactNode;
  onClick: () => void;
};

export const XButton = ({ buttonStyle, width, height, children, onClick }: ButtonPropsType) => {
  return (
    <Wrapper
      width={width}
      height={height}
      buttonStyle={buttonStyle}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Omit<ButtonPropsType, 'children' | 'onClick'>>`
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};
  background-color: ${({ buttonStyle }) => (buttonStyle === 'solid' ? theme.color.main : theme.color.gray1)};
  color: ${({ buttonStyle }) => (buttonStyle === 'solid' ? theme.color.gray1 : theme.color.mainDark1)};
  ${({ buttonStyle }) =>
    buttonStyle === 'ghost' &&
    css`
      border: 1px solid ${theme.color.mainDark1};
    `};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    ${({ buttonStyle }) =>
      buttonStyle === 'ghost' &&
      css`
        color: ${theme.color.gray1};
      `};
    background-color: ${({ buttonStyle }) =>
      buttonStyle === 'solid' ? theme.color.mainLight1 : theme.color.mainDark1};
  }
  &:active {
    transition: 0.05s ease-in-out;
    background-color: ${({ buttonStyle }) => (buttonStyle === 'solid' ? theme.color.mainDark1 : theme.color.mainDark2)};
  }
`;
