import styled from '@emotion/styled';
import { Icon } from '@iconify/react';
import { theme } from '@/style/theme';
import { InputHTMLAttributes } from 'react';

interface SearchBarType extends InputHTMLAttributes<HTMLInputElement> {
  width: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  width,
  onChange = () => {
    console.log('change!');
  },
  ...props
}: SearchBarType) => {
  return (
    <Wrapper width={width}>
      <_SearchBar placeholder={props.placeholder} onChange={onChange} />
      <Icon icon={'ph:magnifying-glass-bold'} width={20} height={20} color="#999999" />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  position: relative;
  flex: none;
  & > svg {
    position: absolute;
    right: 0px;
    top: 15px;
    cursor: pointer;
  }
`;

const _SearchBar = styled.input`
  width: 100%;
  height: 50px;
  border-bottom: 1px ${theme.color.gray5} solid;
  font-size: 14px;
  & ::placeholder {
    color: ${theme.color.gray2};
  }
`;
