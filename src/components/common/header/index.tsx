import styled from '@emotion/styled';
import LogoImg from '@/assets/Logo.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { theme } from '@/style/theme';
import { Cookie } from '@/utils/cookie';
import { usePathChangeEffect } from '@/hooks/usePathChangeEffect';

export const Header = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState<number>(0);
  const { pathname } = useLocation();
  const _pathname: string = pathname.substring(1);
  const email = Cookie.get('email');
  const [clickCount, setClickCount] = useState<number>(0);

  usePathChangeEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflowY = 'auto';
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (clickCount > 10) {
      localStorage.setItem('critical', 'true');
      alert('이스터에그 발견');
    }
  }, [clickCount]);

  return (
    <>
      <Wrapper scroll={scroll} pathname={_pathname}>
        {_pathname === '' ? (
          <>
            <LeftSide scroll={scroll}>
              <img src={LogoImg} />
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
                  navigate('/login');
                }}
              >
                시작하기
              </Button>
            </RightSide>
          </>
        ) : (
          <>
            <Link to={_pathname === '' || _pathname === 'login' ? '/' : '/team'}>
              <LeftSide2>
                <img src={LogoImg} />
                <span>Xquare Infra</span>
              </LeftSide2>
            </Link>
            <RightSide2
              onClick={() => {
                setClickCount((prev) => prev + 1);
              }}
            >
              {email ? email : ''}
            </RightSide2>
          </>
        )}
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
  gap: 14px;
  justify-content: start;
  font-size: 30px;
  font-weight: 700;
  > span {
    transition: 0.25s ease-in-out;
    color: ${({ scroll }) => (scroll === 0 ? 'white' : scroll >= 408 ? '#9650fa' : 'black')};
  }
`;

const LeftSide2 = styled.div`
  width: 300px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 14px;
  font-size: 30px;
  font-weight: 700;
  color: ${theme.color.gray9};
`;

const RightSide = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 30px;
  font-weight: 700;
`;

const RightSide2 = styled.div`
  display: flex;
  gap: 8px;
  color: ${theme.color.gray8};
`;
