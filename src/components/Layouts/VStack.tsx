import { IChildren } from '@/utils/types/components/children';
import styled from '@emotion/styled';

interface IProps extends IChildren {
  widthFit?: boolean;
  gap?: number;
  justify?: 'left' | 'center' | 'right';
}

export const VStack = ({ children, widthFit = true, gap = 0, justify = 'center' }: IProps) => (
  <Wrapper widthFit={widthFit} gap={gap} justify={justify}>
    {children}
  </Wrapper>
);

const Wrapper = styled.div<Omit<IProps, 'children'>>`
  display: flex;
  flex-direction: column;
  align-items: ${({ justify }) => {
    switch (justify) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return 'center';
    }
  }};
  justify-content: flex-start;
  gap: ${({ gap }) => `${gap}px`};
  width: ${({ widthFit }) => (widthFit ? '100%' : 'auto')};
`;
