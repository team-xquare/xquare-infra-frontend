import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';

type RadioPropsType = {
  children: ReactNode;
  isChecked: boolean;
  onChange: () => void;
  isBold?: boolean;
  font?: number;
};

export const Radio = ({ children, isChecked, onChange, font = 16, isBold = false }: RadioPropsType) => {
  return (
    <Wrapper isChecked={isChecked} onClick={onChange} font={font} isBold={isBold}>
      <RadioBorder isChecked={isChecked}>
        <RadioInner isChecked={isChecked} />
      </RadioBorder>
      <Label>{children}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div<Omit<RadioPropsType, 'children' | 'onChange'>>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${({ font }) => `${font}px`};
  font-weight: ${({ isBold }) => (isBold ? 700 : 500)};
  color: black;
  transition: 0.2s linear;
`;

const RadioBorder = styled.div<Pick<RadioPropsType, 'isChecked'>>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${theme.color.main};
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const RadioInner = styled.div<Pick<RadioPropsType, 'isChecked'>>`
  width: ${({ isChecked }) => (isChecked ? '100%' : '0')};
  height: ${({ isChecked }) => (isChecked ? '100%' : '0')};
  border-radius: 50%;
  background-color: ${theme.color.main};
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;
`;

const Label = styled.span`
  user-select: none;
`;
