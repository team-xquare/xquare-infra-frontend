import styled from '@emotion/styled';
import { Sidebar } from '@/components/common/sidebar';
import { XButton } from '@/components/common/XButton';
import { Icon } from '@iconify/react';
import { theme } from '@/style/theme';
import { TeamContainer } from '@/components/Team/TeamContainer';
import { SearchBar } from '@/components/common/SearchBar';
import React, { useEffect, useState } from 'react';
import { teamCheck } from '@/utils/apis/team';
import { useNavigate } from 'react-router-dom';

type TagType = 'CLUB' | 'TEAM_PROJECT' | 'PRIVATE_PROJECT' | 'ETC';

type TeamType = {
  name: string;
  admin: string;
  deploy: string[];
  tag: TagType;
};

export const Team = () => {
  const [teamArray, setTeamArray] = useState<any>([]);
  const link = useNavigate();

  useEffect(() => {
    teamCheck()
      .then((res) => {
        console.log(res.data);
        setTeamArray(res.data.team_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <Container>
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
          {teamArray.length > 0 ? (
            teamArray.map((element: any, index: any) => {
              return (
                <div
                  onClick={() => {
                    link(`/team/${element.team_id}/manage`);
                  }}
                >
                  <TeamContainer
                    key={index}
                    name={element.team_name_ko}
                    admin={element.administrator_name}
                    deploy={element.deploy_list}
                    tag={element.team_type}
                  />
                </div>
              );
            })
          ) : (
            <TipBox>아직 생성하거나 속한 팀이 없습니다!</TipBox>
          )}
        </ContainerWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  padding-left: 100px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1120px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 14px;
  > div {
    width: 100%;
  }
`;
