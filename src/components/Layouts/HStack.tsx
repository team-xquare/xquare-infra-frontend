import { IChildren } from '@/utils/types/components/children';
import styled from '@emotion/styled';

interface IProps extends IChildren {
  widthFit?: boolean;
  gap?: number;
  align?: 'top' | 'center' | 'bottom';
  justify?: 'left' | 'right' | 'center' | 'between';
}

export const HStack = ({ children, widthFit = true, gap = 0, justify = 'center', align = 'top' }: IProps) => (
  <Wrapper widthFit={widthFit} gap={gap} justify={justify} align={align}>
    {children}
  </Wrapper>
);

const Wrapper = styled.div<Omit<IProps, 'children'>>`
  display: flex;
  flex-direction: row;
  align-items: ${({ align }) => {
    switch (align) {
      case 'top':
        return 'start';
      case 'bottom':
        return 'end';
      default:
        return 'center';
    }
  }};
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      case 'center':
        return 'center';
      case 'between':
        return 'space-between';
    }
  }};
  gap: ${({ gap }) => `${gap}px`};
  width: ${({ widthFit }) => (widthFit ? '100%' : 'auto')};
`;
