import styled from '@emotion/styled';

export const Main = () => {
  return (
    <Wrapper>
      <Container>a</Container>
      <Container>b</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
