import styled from '@emotion/styled';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const Sidebar = () => {
  const [isOpen, seIsOpen] = useState<boolean>(false);

  return (
    <Wrapper isOpen={isOpen}>
      <Container>
        <Menu isOpen={isOpen}>a</Menu>
        <Menu isOpen={isOpen}>b</Menu>
      </Container>
      <BottomMenu
        isOpen={isOpen}
        onClick={() => {
          seIsOpen(!isOpen);
        }}
      >
        <div>
          <div>
            <Icon icon={'ep:d-arrow-left'} width={24} height={24} />
          </div>
          <span>사이드바 축소</span>
        </div>
      </BottomMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '260px' : '80px')};
  left: 0;
  transition: 0.4s ease-in-out;
  height: calc(100vh - 80px);
  background-color: white;
  border-right: 1px #dddddd solid;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 30px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  width: ${({ isOpen }) => (isOpen ? '240px' : '60px')};
  padding: 10px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition:
    background-color 0.1s linear,
    width 0.4s ease-in-out;
  &:hover {
    background-color: #f0e6ff;
  }
  > div {
    width: 240px;
    height: 40px;
    display: flex;
    align-items: center;
    > div {
      width: 40px;
      height: 40px;
      flex: 0;
    }
    > span {
      font-size: 20px;
      width: 180px;
      transition: 0.4s ease-in-out;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-align: center;
    }
  }
`;

const BottomMenu = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  width: ${({ isOpen }) => (isOpen ? '240px' : '60px')};
  padding: 10px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition:
    background-color 0.1s linear,
    width 0.4s ease-in-out;
  &:hover {
    background-color: #f0e6ff;
  }
  > div {
    width: 240px;
    height: 40px;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      flex: none;
      transition: 0.4s ease-in-out;
      ${({ isOpen }) => (isOpen ? `transform: rotate(0deg)` : `transform: rotate(180deg)`)};
    }
    > span {
      font-size: 18px;
      width: 180px;
      transition: 0.4s ease-in-out;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-align: center;
    }
  }
`;
