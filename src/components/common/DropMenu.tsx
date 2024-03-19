import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export const DropMenu = ({ props }: { props?: string[] }) => {
  return (
    <>
      {props && props.length >= 1 && (
        <Wrapper>
          {props.map((element, index) => {
            return (
              <Box key={index} isLast={(props.length - 1 === index).toString()}>
                {element}
              </Box>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 134px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px ${theme.color.gray5} solid;
  background-color: ${theme.color.gray1};
`;

const Box = styled.div<{ isLast: string }>`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.color.gray7};
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isLast }) => {
    return (
      isLast === 'false' &&
      css`
        border-bottom: 1px ${theme.color.gray5} solid;
      `
    );
  }};
`;
