import styled from '@emotion/styled';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { theme } from '@/style/theme';
import { TeamContainer } from '@/components/Team/TeamContainer';
import { SearchBar } from '@/components/common/SearchBar';
import { useNavigate } from 'react-router-dom';
import { TeamCheckType } from '@/utils/types/teamType';
import { useCustomQuery } from '@/hooks/useCustomQueries';
import { useState } from 'react';

export const Team = () => {
  const link = useNavigate();
  const [selected, setSelected] = useState(0);

  const { data: teamList }: TeamCheckType = useCustomQuery({
    queryKey: ['team-list'],
    url: '/team/my-team',
    select: (res) => res?.data.team_list,
  });

  const count = Math.ceil(teamList?.length / 3) || 1;

  return (
    <Wrapper>
      <TitleContainer>
        <Title>팀</Title>
        <Describtion>프로젝트를 개발하고 관리할 팀을 정의해보세요.</Describtion>
      </TitleContainer>
      <UtilContainer>
        <SearchBar width={312} placeholder="팀 검색" />
        <XButton
          width={100}
          height={50}
          buttonStyle="solid"
          onClick={() => {
            link('/team/create');
          }}
        >
          <Icon icon={'ic:round-plus'} width={20} height={20} />팀 등록
        </XButton>
      </UtilContainer>
      <ContainerWrapper>
        {teamList?.length > 0 ? (
          teamList?.slice(selected * 3, selected * 3 + 3).map((element: any, index: number) => (
            <div
              onClick={() => {
                link(`/team/${element.team_id}/manage`);
              }}
              key={index}
              style={{
                cursor: 'pointer',
              }}
            >
              <TeamContainer
                name={element.team_name_ko}
                admin={element.administrator_name}
                deploy={element.deploy_list}
                tag={element.team_type}
              />
            </div>
          ))
        ) : (
          <TipBox>아직 생성하거나 속한 팀이 없습니다!</TipBox>
        )}
      </ContainerWrapper>
      <PaginationContainer>
        {Array.from(new Array(count).keys()).map((i) => (
          <Pagination selected={i === selected} key={i} onClick={() => setSelected(i)}>
            {(i + 1).toString().padStart(2, '0')}
          </Pagination>
        ))}
      </PaginationContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Pagination = styled.span<{ selected: Boolean }>`
  font-weight: ${({ selected }) => (selected ? 'bold' : 'regular')};
  color: ${({ selected }) => (selected ? 'black' : 'gray')};
  cursor: pointer;
  transition: 0.1s ease-in-out;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1120px;
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
  width: 100%;
  max-width: 1120px;
  height: 50px;
  margin: 30px 0 30px 0;
  display: flex;
  justify-content: space-between;
`;

const TipBox = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 120px;
  color: ${theme.color.gray5};
  border: 1px ${theme.color.gray5} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 20px;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 14px;
  > div {
    width: 100%;
  }
`;
