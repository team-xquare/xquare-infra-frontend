import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { DropMenu } from './DropMenu';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import ArrowImg from '@/assets/Arrow.svg';

type SelectBarType = {
  selectedIndex?: number;
  onSelect: (index: number) => void;
  values: string[];
};

export const SelectBar = ({ selectedIndex, onSelect, values }: SelectBarType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const onOpen = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [selectedIndex]);

  return (
    <Wrapper ref={ref}>
      <_SelectBar onClick={onOpen} selectedIndex={selectedIndex}>
        <span>{selectedIndex === undefined ? '항목 보기' : values[selectedIndex]}</span>
        <ImgContainer isOpen={isOpen}>
          <img src={ArrowImg} />
        </ImgContainer>
      </_SelectBar>
      {isOpen && <DropMenu values={values} onSelect={onSelect} onClose={setIsOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const _SelectBar = styled.div<Pick<SelectBarType, 'selectedIndex'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  padding: 14px 16px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray5};
  cursor: pointer;
  flex: none;
  color: ${({ selectedIndex }) => (selectedIndex === undefined ? theme.color.gray5 : theme.color.gray7)};
  span {
    height: 18px;
  }
`;

const ImgContainer = styled.div<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => `rotate(${isOpen ? '180deg' : '0deg'})`};
  height: 18px;
`;
