import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { css } from '@emotion/react';

type DropMenuType = {
  values: string[];
  selectedIndex?: number;
  onSelect: (index: number) => void;
  onClose: (bool: boolean) => void;
};

export const DropMenu = ({ values, onSelect, onClose, selectedIndex = -1 }: DropMenuType) => {
  return (
    <Wrapper>
      {values &&
        values.length >= 1 &&
        values.map((element, index) => {
          return (
            <Box
              key={index}
              isLast={(values.length - 1 === index).toString()}
              onClick={() => {
                onSelect(index);
                onClose(false);
              }}
              selected={index === selectedIndex}
            >
              {element}
            </Box>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 134px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px ${theme.color.gray5} solid;
  background-color: ${theme.color.gray1};
  position: absolute;
  margin-top: 8px;
`;

const Box = styled.div<{ isLast: string; selected: boolean }>`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${({ selected }) => (selected ? theme.color.mainDark1 : theme.color.gray7)};
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s linear;
  ${({ isLast }) => {
    return (
      isLast === 'false' &&
      css`
        border-bottom: 1px ${theme.color.gray5} solid;
      `
    );
  }};
  :hover {
    color: ${theme.color.mainDark1};
  }
`;
