import { DatabaseIcon } from '@/assets/DatabaseIcon';
import { ErrorIcon } from '@/assets/ErrorIcon';
import { InformationIcon } from '@/assets/InformationIcon';
import { RocketIcon } from '@/assets/RocketIcon';
import { XButton } from '@/components/common/XButton';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

type AlertType = {
  icon: React.ReactNode;
  title: string;
  content: string;
};

const AlertList: AlertType[] = [
  {
    icon: <ErrorIcon size={24} color={theme.color.gray9} />,
    title: '500 Error',
    content: 'HTTP 500 에러가 발생하면 즉시 알림을 제공합니다.',
  },
  {
    icon: <DatabaseIcon size={24} color={theme.color.gray9} />,
    title: 'Slow Query',
    content: '데이터베이스에 쿼리하는데 걸리는 시간이 1초 이상이라면,\n즉시 알림을 제공합니다.',
  },
  {
    icon: <RocketIcon size={24} color={theme.color.gray9} />,
    title: '배포 알림',
    content: '배포시작, 배포 성공 여부에 대한 정보를 제공합니다.',
  },
  {
    icon: <InformationIcon size={24} color={theme.color.gray9} />,
    title: '준비중...',
    content:
      '여러 알림을 제공해 드리기 위해 노력중입니다. 운영에 도움이 될 것 같은 알림이 있다면 채널톡으로 문의해주세요.',
  },
];

export const TeamDeployContainerAlert = () => {
  const { teamUUID, deployUUID, env } = useParams();
  const link = useNavigate();

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>알림을 받아보세요.</TeamName>
        <Title>Alert</Title>
      </TitleContainer>
      <Line>
        <div>Provide Notification Item</div>
      </Line>
      <AlertContainer>
        {AlertList.map((alertItem, idx) => {
          return (
            <AlertBox key={idx}>
              <div>
                <div>{alertItem.icon}</div>
                <div>{alertItem.title}</div>
              </div>
              <div>{alertItem.content}</div>
            </AlertBox>
          );
        })}
      </AlertContainer>
      <BottomContainer>
        <XButton
          width={100}
          height={50}
          onClick={() => {
            link(`/team/${teamUUID}/deploy/${deployUUID}/container/${env}/alertActive`);
          }}
        >
          활성화 하기
        </XButton>
      </BottomContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TeamName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.color.gray5};
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Line = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 1px;
  background-color: ${theme.color.gray4};
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    font-size: 30px;
    font-weight: 700;
    background-color: white;
    color: ${theme.color.gray6};
  }
`;

const AlertContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: 100%;
  max-width: 1120px;
`;

const AlertBox = styled.div`
  width: 100%;
  height: 230px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid ${theme.color.gray5};
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  }
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 12px;
    > div:nth-child(1) {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
    > div:nth-child(2) {
      font-size: 24px;
      font-weight: 500;
      color: ${theme.color.gray8};
    }
  }
  > div:nth-child(2) {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.gray5};
    word-wrap: break-word;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
