import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import LogoImg from '@/assets/Logo.svg';
import { useEffect, useState } from 'react';

// 0 408

export const Header = () => {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Wrapper scroll={scroll}>
        <img src={LogoImg} />
        <div>
          <span>소개</span>
          <span>고객 지원</span>
        </div>
        <Button></Button>
      </Wrapper>
      <Outlet />
    </>
  );
};

const Wrapper = styled.div<{ scroll: number }>`
  position: fixed;
  transition: 0.2s linear;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  padding: 0 90px 0 90px;
  align-items: center;
  color: ${({ scroll }) => (scroll === 0 ? 'white' : scroll >= 408 ? 'rgba(0,0,0,0)' : 'black')};
  background-color: ${({ scroll }) => (scroll === 0 ? 'rgba(0,0,0,0)' : scroll >= 408 ? 'rgba(0,0,0,0)' : 'white')};
  z-index: 999;
  > div {
    width: 254px;
    display: flex;
    justify-content: space-between;
  }
`;

const Button = styled.div`
  width: 192px;
  height: 52px;
  border-radius: 8px;
  border: 2px white solid;
`;
