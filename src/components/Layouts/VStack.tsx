import { IChildren } from '@/utils/types/components/children';
import styled from '@emotion/styled';

interface IProps extends IChildren {
  widthFit?: boolean;
  gap?: number;
}

export const VStack = ({ children, widthFit = true, gap = 0 }: IProps) => (
  <Wrapper widthFit={widthFit} gap={gap}>
    {children}
  </Wrapper>
);

const Wrapper = styled.div<Pick<IProps, 'widthFit' | 'gap'>>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ gap }) => `${gap}px`};
  width: ${({ widthFit }) => (widthFit ? '100%' : 'auto')};
`;
