import styled from '@emotion/styled';
import { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, seIsOpen] = useState<boolean>(false);

  return (
    <Wrapper
      isOpen={isOpen}
      onClick={() => {
        seIsOpen(!isOpen);
      }}
    ></Wrapper>
  );
};

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '300px' : '60px')};
  left: 0;
  transition: 0.4s ease-in-out;
  height: 100vw;
  background-color: white;
  border-right: 1px #dddddd solid;
  position: absolute;
  z-index: 10;
`;
