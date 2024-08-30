import React, { useEffect, useState } from 'react';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { useResizable } from '@/hooks/useResizable';
import { getDetailTrace } from '@/utils/apis/trace';
import { SpanType } from '@/utils/types/traceType';
import { FlameGraph } from '@/components/Trace/FlameGraph.tsx';

type PropsType = {
  selectedTrace: string | null;
  setSelectedTrace: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TraceInformation = ({ selectedTrace, setSelectedTrace }: PropsType) => {
  const { width, boxRef, handleMouseDown } = useResizable(800, 300, window.innerWidth - 280);
  const [data, setData] = useState<SpanType[]>();

  useEffect(() => {
    if (selectedTrace) {
      getDetailTrace(selectedTrace).then((res) => {
        setData(res.data.spans);
      });
    }
  }, [selectedTrace]);

  return (
    <Wrapper selectedTrace={selectedTrace} width={width} ref={boxRef}>
      <Resizer onMouseDown={handleMouseDown} />
      {data && (
        <Content>
          <ColorBox />
          <TitleContainer>
            <h2>Trace View</h2>
            <b onClick={() => setSelectedTrace(null)}>닫기</b>
          </TitleContainer>
          <div>{selectedTrace && <FlameGraph spans={data} />}</div>
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ selectedTrace: string | null; width: number }>`
  position: fixed;
  top: 80px;
  right: 0;
  width: ${({ width }) => `${width}px`};
  height: calc(100vh - 80px);
  background-color: ${theme.color.gray1};
  z-index: 1;
  display: ${({ selectedTrace }) => (selectedTrace ? 'flex' : 'none')};
  flex-direction: row;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 1px solid ${theme.color.gray4};
`;

const Resizer = styled.div`
  width: 4px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  cursor: ew-resize;
  transition: 0.2s linear;
  :hover {
    background-color: ${theme.color.gray3};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  > b {
    color: red;
    cursor: pointer;
  }
`;

const ColorBox = styled.div`
  width: 100%;
  height: 14px;
  background-color: ${theme.color.main};
`;
