import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { DropMenu } from './DropMenu';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import ArrowImg from '@/assets/Arrow.svg';

type SelectBarType = {
  selectedIndex?: number | undefined;
  onSelect: (index: number | undefined) => void;
  values: string[];
  label?: string;
  placehold?: string;
  canCancle?: boolean;
};

export const SelectBar = ({
  selectedIndex,
  onSelect,
  values,
  label,
  placehold = '항목 보기',
  canCancle = false,
}: SelectBarType) => {
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
    <Wrapper label={label}>
      {label && <Label>{label}</Label>}
      <SelectBarWrapper ref={ref}>
        <_SelectBar onClick={onOpen} selectedIndex={selectedIndex}>
          <span>{selectedIndex === undefined ? placehold : values[selectedIndex]}</span>
          <ImgContainer isOpen={isOpen}>
            <img src={ArrowImg} />
          </ImgContainer>
        </_SelectBar>
        {isOpen && (
          <DropMenu
            values={values}
            onSelect={onSelect}
            onClose={setIsOpen}
            selectedIndex={selectedIndex}
            canCancle={canCancle}
          />
        )}
      </SelectBarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ label?: string }>`
  height: ${({ label }) => (!!label ? '78px' : '50px')};
`;

const SelectBarWrapper = styled.div`
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

const Label = styled.label`
  width: 100%;
  height: 22px;
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const ImgContainer = styled.div<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => `rotate(${isOpen ? '180deg' : '0deg'})`};
  height: 18px;
`;
