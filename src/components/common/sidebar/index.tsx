import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { default as styled } from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { menu as menuList } from './menus';
import { Icon } from '@iconify/react';
import { Menu } from './Menu';

interface PropType {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const rawPath = (url: string) =>
  url
    .split('/')
    .map((i: any) => (i.includes('-') ? ':id' : i))
    .join('/');

export const Sidebar = ({ isOpen, setOpen }: PropType) => {
  const { pathname }: any = useLocation();
  const params: any = useParams();
  const navigate = useNavigate();
  const raw_pathname = rawPath(pathname);
  const menuData = menuList[raw_pathname] || { back: undefined, menu: [] }; // 데이터가 없는 경우를 대비한 기본값 설정
  const { back, menu: menus } = menuData; // 이제 여기서 구조 분해 할당을 사용합니다.

  return (
    <Wrapper isOpen={isOpen}>
      {back && (
        <BackContainer isOpen={isOpen}>
          <div>
            <Icon icon="iconamoon:arrow-left-2-bold" width={28} height={28} />
          </div>

          <span>돌아가기</span>
        </BackContainer>
      )}
      <ContentContainer>
        <MenuContainer>
          {menus?.map((item: any, index: number) => (
            <Menu
              key={index}
              icon={item.icon}
              text={item.name}
              isOpen={isOpen}
              onClick={() => navigate(item.link.replaceAll('-team-', params?.teamUUID))}
            />
          ))}
        </MenuContainer>
        <Menu icon="ep:d-arrow-left" text="사이드바 축소" rotate isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: ${({ isOpen }) => (isOpen ? 260 : 85)}px;
  transition: 0.4s ease-in-out;
  height: calc(100vh - 80px);
  z-index: 20;
  background: #ffffff;
  border-right: 1px solid #dddddd;
`;

const BackContainer = styled.div<{ isOpen: boolean }>`
  gap: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  padding: 20px 25px;
  border-bottom: 1px solid #dddddd;
  width: ${({ isOpen }) => (isOpen ? 260 : 85)}px;
  transition:
    background-color 0.1s linear,
    width 0.4s ease-in-out;
  & > div {
    width: 28px;
    height: 28px;
  }
  & > span {
    width: 100px;
    font-size: 20px;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
  }
  &:hover {
    background-color: #dddddd;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 15px;
  height: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
