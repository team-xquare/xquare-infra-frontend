import { ReactNode } from 'react';
import styled from '@emotion/styled';

type LayoutBoxPropsType = {
  width?: string;
  height?: string;
  flex?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'start' | 'end' | 'center';
  gap?: number;
  max?: number;
  children?: ReactNode;
};

export const LayoutBox = ({ width, height, flex, justify, align, gap, children, max }: LayoutBoxPropsType) => {
  return (
    <Wrapper width={width} height={height} flex={flex} justify={justify} align={align} gap={gap} max={max}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<LayoutBoxPropsType>`
  display: flex;
  flex-direction: ${({ flex }) => flex};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => `${gap}px`};
  max-width: ${({ max }) => `${max}px`};
`;
