import { Sidebar } from '@/components/common/sidebar';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const SideBarLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Wrapper>
      <Sidebar isOpen={isOpen} setOpen={setIsOpen} />
      <Content isOpen={isOpen}>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const Content = styled.div<{ isOpen: boolean }>`
  width: calc(100% - ${({ isOpen }) => (isOpen ? 260 : 0)}px);
  margin-top: 40px;
  transition: 0.4s ease-in-out;
  padding: 0 50px 0 50px;
  display: flex;
  height: calc(100vh - 80px + 100px);
`;
