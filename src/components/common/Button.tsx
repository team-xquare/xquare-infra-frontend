import { ReactNode } from 'react';
import styled from '@emotion/styled';

type ButtonStyleType = 'solid' | 'ghost';
type ButtonColorType = 'black' | 'white';

type ButtonPropsType = {
  buttonStyle: ButtonStyleType;
  buttonColor: ButtonColorType;
  width: number;
  height: number;
  children: ReactNode;
  isBold?: boolean;
  font?: number;
  onClick: () => void;
};

export const Button = ({
  buttonStyle,
  buttonColor,
  width,
  height,
  children,
  onClick,
  font = 16,
  isBold = false,
}: ButtonPropsType) => {
  return (
    <Wrapper
      width={width}
      height={height}
      buttonStyle={buttonStyle}
      buttonColor={buttonColor}
      onClick={onClick}
      font={font}
      isBold={isBold}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Omit<ButtonPropsType, 'children' | 'onClick'>>`
  cursor: pointer;
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  transition: 0.2s linear;
  font-size: ${({ font }) => `${font}px`};
  font-weight: ${({ isBold }) => (isBold ? 700 : 500)};
  color: ${({ buttonColor, buttonStyle }) =>
    buttonStyle === 'ghost' ? buttonColor : buttonColor === 'black' ? 'white' : 'black'};
  border: 1px ${({ buttonColor }) => buttonColor} solid;
  background-color: ${({ buttonColor, buttonStyle }) => (buttonStyle === 'ghost' ? 'rgba(0,0,0,0)' : buttonColor)};
  &:hover {
    color: ${({ buttonColor, buttonStyle }) =>
      buttonStyle === 'ghost' ? (buttonColor === 'black' ? 'white' : 'black') : buttonColor};
    background-color: ${({ buttonColor, buttonStyle }) => (buttonStyle === 'ghost' ? buttonColor : 'rgba(0,0,0,0)')};
  }
`;
