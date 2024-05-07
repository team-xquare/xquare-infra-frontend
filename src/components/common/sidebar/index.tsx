import styled from '@emotion/styled';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

type MenuType = {
  icon: string;
  name: string;
  link: string;
};

type MenusType = {
  path: string;
  back: undefined | string;
  menu: MenuType[];
};

const menu: MenusType[] = [
  {
    path: '/team',
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀', link: '/team' },
      { icon: 'icon-park-outline:people', name: '계정', link: '' },
    ],
  },
  {
    path: '/team/create',
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀', link: '/team' },
      { icon: 'icon-park-outline:people', name: '계정', link: '' },
    ],
  },
  {
    path: '/team/:id/manage',
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀 관리', link: '' },
      { icon: 'icon-park-outline:people', name: '배포', link: `/team/-team-/deploy` },
    ],
  },
  {
    path: '/team/:id/deploy',
    back: '/team/-team-/manage',
    menu: [
      { icon: 'ph:circles-four-light', name: '팀 관리', link: '' },
      { icon: 'icon-park-outline:people', name: '배포', link: `/team/-team-/deploy` },
    ],
  },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const currentMenu = menu.find((item) => useMatch(item.path));
  const link = useNavigate();
  const params: any = useParams();

  return (
    <Wrapper isOpen={isOpen}>
      <div>
        <BackContainer isOpen={isOpen}>
          <div>
            <div>
              <Icon icon="iconamoon:arrow-left-2-bold" width={28} height={28} />
            </div>
            <span>돌아가기</span>
          </div>
        </BackContainer>
        <Container>
          {currentMenu &&
            currentMenu.menu.map((menuItem, index) => (
              <Menu
                key={index}
                isOpen={isOpen}
                onClick={() => {
                  link(menuItem.link.replaceAll('-team-', params?.teamUUID));
                }}
              >
                <div>
                  <div>
                    <Icon icon={menuItem.icon} width={24} height={24} />
                  </div>
                  <span>{menuItem.name}</span>
                </div>
              </Menu>
            ))}
        </Container>
      </div>

      <BottomMenu
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
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
  transition: 0.4s ease-in-out;
  height: calc(100vh - 80px);
  background-color: white;
  border-right: 1px #dddddd solid;
  position: fixed;
  z-index: 10;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 30px 0;
`;

const BackContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  transition: 0.4s ease-in-out;
  align-items: center;
  width: ${({ isOpen }) => (isOpen ? '260px' : '80px')};
  padding: 15px 10px 15px 10px;
  border-bottom: 1px solid #dddddd;
  overflow: hidden;
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
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const Menu = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  width: ${({ isOpen }) => (isOpen ? '260px' : '80px')};
  padding: 10px;
  height: 60px;
  border-radius: 20px;
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
  }
`;

const BottomMenu = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  width: ${({ isOpen }) => (isOpen ? '240px' : '60px')};
  padding: 10px;
  height: 60px;
  border-radius: 20px;
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
      text-align: start;
      margin-left: 10px;
    }
  }
`;
