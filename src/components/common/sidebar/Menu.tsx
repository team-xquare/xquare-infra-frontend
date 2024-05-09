import { Icon } from '@iconify/react';
import styled from '@emotion/styled';

interface PropType {
  isOpen: boolean;
  onClick: () => void;
  icon: string;
  text: string;
  rotate?: boolean;
}

export const Menu = ({ isOpen, onClick, icon, text, rotate }: PropType) => {
  return (
    <Content rotate={rotate} isOpen={isOpen} onClick={onClick}>
      <div>
        <Icon icon={icon} width={24} height={24} />
      </div>
      <span>{text}</span>
    </Content>
  );
};

const Content = styled.div<{ isOpen: boolean; rotate?: boolean }>`
  user-select: none;
  cursor: pointer;
  width: ${({ isOpen }) => (isOpen ? '235px' : '60px')};
  padding: 10px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  transition:
    background-color 0.1s linear,
    width 0.4s ease-in-out;
  &:hover {
    background: #f0e6ff;
  }
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    flex: none;
    transition: 0.4s ease-in-out;
    ${({ rotate, isOpen }) => (rotate ? (isOpen ? `transform: rotate(0deg)` : `transform: rotate(180deg)`) : '')};
  }
  > span {
    font-size: 18px;
    width: 180px;
    transition: 0.4s ease-in-out;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-align: start;
    margin-left: 10px;
  }
`;
