import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';

type TextProps = {
  children: string;
  lineDivision?: boolean;
  size?: number;
  weight?: number;
  color?: string;
};

export const Text = ({
  children,
  lineDivision = false,
  size = 16,
  weight = 400,
  color = theme.color.gray9,
}: TextProps) => {
  const lines = lineDivision ? children.split('\n') : [children];

  return (
    <StyledText size={size} weight={weight} color={color}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </StyledText>
  );
};

const StyledText = styled.p<Omit<TextProps, 'children' | 'lineDivision'>>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
`;
