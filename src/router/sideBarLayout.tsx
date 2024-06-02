import { Footer } from '@/components/common/footer';
import { Sidebar } from '@/components/common/sidebar';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const SideBarLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Wrapper>
      <Sidebar isOpen={isOpen} setOpen={setIsOpen} />
      <ContentContainer>
        <Content isOpen={isOpen}>
          <Outlet />
        </Content>
        <FooterContainer isOpen={isOpen}>
          <Footer />
        </FooterContainer>
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div<{ isOpen: boolean }>`
  width: 100%;
  margin-top: 40px;
  transition: 0.4s ease-in-out;
  padding: 0 50px 0 ${({ isOpen }) => (isOpen ? 310 : 110)}px;
  display: flex;
  min-height: calc(100vh - 80px + 100px);
`;

const FooterContainer = styled.div<{ isOpen: boolean }>`
  padding-left: ${({ isOpen }) => (isOpen ? 260 : 80)}px;
  transition: 0.4s ease-in-out;
`;
