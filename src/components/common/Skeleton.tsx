import styled from '@emotion/styled';

interface SkeletonProps {
  width?: number;
  height?: number;
  radius?: number;
}

const SkeletonDiv = styled.div<SkeletonProps>`
  background-color: #e0e0e0;
  border-radius: ${({ radius }) => `${radius}px`};
  width: 100%;
  max-width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const Skeleton = ({ width = 1120, height = 200, radius = 4 }: SkeletonProps) => {
  return <SkeletonDiv width={width} height={height} radius={radius} />;
};

export default Skeleton;
