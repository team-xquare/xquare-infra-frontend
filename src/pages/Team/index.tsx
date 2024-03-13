import { Sidebar } from '@/components/common/sidebar';
import styled from '@emotion/styled';

export const Team = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Container>hello</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  margin-left: 60px;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 100vw;
`;
