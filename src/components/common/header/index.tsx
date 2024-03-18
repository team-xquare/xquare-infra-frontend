import styled from '@emotion/styled';
import LogoImg from '@/assets/Logo.svg';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

export const Header = () => {
  const [scroll, setScroll] = useState<number>(0);
  const { pathname } = useLocation();
  const _pathname: string = pathname.substring(1);

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
      <Wrapper scroll={scroll} pathname={_pathname}>
        <LeftSide scroll={scroll}>
          <img src={LogoImg} />
          <span>Xquare Infra</span>
        </LeftSide>
        <Center>
          <span>소개</span>
          <span>고객 지원</span>
        </Center>
        <RightSide>
          <Button
            width={164}
            height={40}
            buttonStyle="ghost"
            buttonColor={scroll === 0 ? 'white' : 'black'}
            onClick={() => {
              console.log('click!');
            }}
          >
            무료로 시작하기
          </Button>
        </RightSide>
        <WrapperBackground scroll={_pathname === '' ? scroll : 0} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ scroll: number; pathname: string }>`
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
  background-color: ${({ pathname }) => pathname !== '' && 'white'};
  color: ${({ scroll }) => (scroll === 0 ? 'white' : scroll >= 408 ? 'rgba(0,0,0,0)' : 'black')};
  ${({ pathname }) =>
    pathname !== '' &&
    css`
      border-bottom: 1px #dddddd solid;
    `};
  z-index: 999;
`;

const WrapperBackground = styled.div<{ scroll: number }>`
  height: ${({ scroll }) => (scroll < 408 ? '80px' : '0px')};
  background-color: white;
  opacity: ${({ scroll }) => (scroll === 0 ? 0 : 1)};
  position: absolute;
  transition:
    opacity 0.25s linear,
    height 0.6s ease-out;
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

const LeftSide = styled.div<{ scroll: number }>`
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

const RightSide = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 30px;
  font-weight: 700;
`;
