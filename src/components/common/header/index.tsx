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
        <Side scroll={scroll}>
          <img src={LogoImg} />
          <span>Xquare Infra</span>
        </Side>
        <Center>
          <span>소개</span>
          <span>고객 지원</span>
        </Center>
        <Side scroll={scroll}>
          <Button scroll={scroll}></Button>
        </Side>
        <WrapperBackground scroll={scroll} />
      </Wrapper>
      <Outlet />
    </>
  );
};

const Wrapper = styled.div<{ scroll: number }>`
  position: fixed;
  transition: 0.25s ease-in-out;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 90px 0 90px;
  align-items: center;
  color: ${({ scroll }) => (scroll === 0 ? 'white' : scroll >= 408 ? 'rgba(0,0,0,0)' : 'black')};
  z-index: 999;
`;

const WrapperBackground = styled.div<{ scroll: number }>`
  height: ${({ scroll }) => (scroll < 408 ? '80px' : '0px')};
  background-color: white;
  opacity: ${({ scroll }) => (scroll === 0 ? 0 : 1)};
  position: absolute;
  transition:
    opacity 0.25s linear,
    height 0.5s ease-in-out;
  top: 0px;
  left: 0px;
  width: 100vw;
  z-index: -1;
`;

const Center = styled.div`
  width: 254px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
`;

const Side = styled.div<{ scroll: number }>`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 30px;
  font-weight: 700;
  > span {
    transition: 0.25s ease-in-out;
    margin-left: 14px;
    color: ${({ scroll }) => (scroll === 0 ? 'white' : scroll >= 408 ? '#9650fa' : 'black')};
  }
`;

const Button = styled.div<{ scroll: number }>`
  transition: 0.25s ease-in-out;
  width: 192px;
  height: 40px;
  border-radius: 8px;
  border: 2px ${({ scroll }) => (scroll === 0 ? 'white' : 'black')} solid;
  margin-left: 108px;
`;
