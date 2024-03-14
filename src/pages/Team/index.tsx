import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { theme } from '@/style/theme';

export const Team = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Container>
        <TitleContainer>
          <Title>팀</Title>
          <Describtion>프로젝트를 개발하고 관리할 팀을 정의해보세요.</Describtion>
        </TitleContainer>
        <UtilContainer>
          <div>
            <SearchBar placeholder="팀 검색" />
            <Icon icon={'tabler:search'} width={20} height={20} color="#999999" />
          </div>
          <XButton
            width={100}
            height={50}
            buttonStyle="solid"
            onClick={() => {
              console.log('click!!');
            }}
          >
            <Icon icon={'ic:round-plus'} width={20} height={20} />팀 등록
          </XButton>
        </UtilContainer>
        <TipBox>아직 생성하거나 속한 팀이 없습니다!</TipBox>
      </Container>
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
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 1120px;
  margin-top: 80px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #202020;
`;

const Describtion = styled.div`
  font-size: 24px;
  font-weight: 100;
  color: #202020;
`;

const UtilContainer = styled.div`
  width: 1120px;
  height: 50px;
  margin: 30px 0 30px 0;
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    & > svg {
      position: relative;
      right: 24px;
      top: 6px;
      cursor: pointer;
    }
  }
`;

const SearchBar = styled.input`
  width: 312px;
  height: 50px;
  border-bottom: 1px ${theme.color.gray5} solid;
  font-size: 14px;
  & ::placeholder {
    color: ${theme.color.gray2};
  }
`;

const TipBox = styled.div`
  width: 1120px;
  height: 120px;
  color: ${theme.color.gray5};
  border: 1px ${theme.color.gray5} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
