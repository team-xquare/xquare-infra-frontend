import styled from '@emotion/styled';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { theme } from '@/style/theme';
import { TeamContainer } from '@/components/Team/TeamContainer';
import { SearchBar } from '@/components/common/SearchBar';
import { useNavigate } from 'react-router-dom';
import { TeamCheckType } from '@/utils/types/teamType';
import { useCustomQuery } from '@/hooks/useCustomQueries';
import { useMemo, useState } from 'react';
import Skeleton from '@/components/common/Skeleton';
import { LimitBox } from '@/components/Layouts/LimitBox';
import { Text } from '@/components/Elements/Text';
import { VStack } from '@/components/Layouts/VStack';
import { Conditional } from '@/components/Headless/Conditional';

export const Team = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { Wrapper: TeamListWrapper, Render, Loading, Empty } = Conditional();

  const { data: teamList }: TeamCheckType = useCustomQuery({
    queryKey: ['team-list'],
    url: '/v1/team/my-team',
    select: (res) => res?.data.team_list,
  });

  const filteredTeamList = useMemo(() => {
    if (!teamList) return [];
    return teamList.filter((team) => team.team_name_ko.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [teamList, searchTerm]);

  const count = Math.ceil(filteredTeamList.length / 3) || 1;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSelected(0);
  };

  return (
    <Wrapper>
      <LimitBox>
        <Text size={30} weight={600} color={theme.color.gray8}>
          팀
        </Text>
        <Text size={24} weight={100} color={theme.color.gray8}>
          프로젝트를 개발하고 관리할 팀을 정의해보세요.
        </Text>
      </LimitBox>
      <UtilContainer>
        <SearchBar
          width={312}
          placeholder="팀 검색"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <XButton width={100} height={50} buttonStyle="solid" onClick={() => navigate('/team/create')}>
          <Icon icon={'ic:round-plus'} width={20} height={20} />팀 등록
        </XButton>
      </UtilContainer>
      <LimitBox height={500}>
        <VStack gap={14}>
          <TeamListWrapper
            data={teamList}
            emptyFunction={() => {
              return filteredTeamList.length === 0;
            }}
            isLoading={teamList === undefined}
            renderComponent={
              <Render>
                {filteredTeamList.slice(selected * 3, selected * 3 + 3).map((element: any, index: number) => (
                  <div
                    onClick={() => navigate(`/team/${element.team_id}/manage`)}
                    key={index}
                    style={{ cursor: 'pointer', width: '100%' }}
                  >
                    <TeamContainer
                      name={element.team_name_ko}
                      admin={element.administrator_name}
                      deploy={element.deploy_list}
                      tag={element.team_type}
                    />
                  </div>
                ))}
              </Render>
            }
            emptyComponent={
              <Empty>
                <TipBox>검색 결과가 없거나, 속한 팀이 없습니다!</TipBox>
              </Empty>
            }
            loadingComponent={
              <Loading>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton radius={6} height={134} key={i} />
                ))}
              </Loading>
            }
          />
        </VStack>
      </LimitBox>
      {filteredTeamList.length > 0 && (
        <PaginationContainer>
          {Array.from(new Array(count).keys()).map((i) => (
            <Pagination selected={i === selected} key={i} onClick={() => setSelected(i)}>
              {(i + 1).toString().padStart(2, '0')}
            </Pagination>
          ))}
        </PaginationContainer>
      )}
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
