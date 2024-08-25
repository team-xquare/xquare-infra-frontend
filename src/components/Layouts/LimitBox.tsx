import { IChildren } from '@/utils/types/components/children';
import styled from '@emotion/styled';

interface IProps extends IChildren {
  height?: number;
}

export const LimitBox = ({ children, height }: IProps) => {
  return <Wrapper height={height}>{children}</Wrapper>;
};

const Wrapper = styled.div<Pick<IProps, 'height'>>`
  width: 100%;
  max-width: 1120px;
  ${(props) => props.height && `height: ${props.height}px`};
`;
