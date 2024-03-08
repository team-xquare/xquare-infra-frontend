import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

export const Header = () => {
  return (
    <>
      <Wrapper>
        xquare<div>asd</div>zxc
      </Wrapper>
      <Outlet />
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  padding: 0 90px 0 90px;
  align-items: center;
`;
