import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';

export const TeamManage = () => {
  return (
    <Wrapper>
      <Sidebar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;
