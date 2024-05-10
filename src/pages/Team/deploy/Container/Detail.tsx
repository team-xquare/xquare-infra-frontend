import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Tag } from '@/components/Team/Tag';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export const TeamDeployContainerDetail = () => {
  const { deployUUID } = useParams();
  const { messages } = useWebSocket({
    url: `${import.meta.env.VITE_SERVER_SOCKET_URL}/logs?deployId=${deployUUID}&environment=prod`,
  });

  const [log, setLog] = useState<string[]>();
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLog(messages);
  }, [messages]);

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>에일리언즈</TeamName>
        <Title>
          컨테이너 dms-backend
          <Tag tag={'AVAILABLE'} />
        </Title>
        <Describtion>
          <div>team-aliens/DMS-Backend</div>
          <div>https://prod-server.xquare.app/dms</div>
          <div>마지막 배포: 2023-03-06 17:57</div>
        </Describtion>
      </TitleContainer>
      <LogContainer>
        <Label>로그</Label>
        <Log>
          <div></div>
          <div>
            {log && (
              <>
                {log.map((item, index) => {
                  if (item === '') return;
                  return <LogText key={index}>{item}</LogText>;
                })}
                <div ref={logEndRef} />
              </>
            )}
          </div>
        </Log>
      </LogContainer>
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
  margin-top: 80px;
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

const Describtion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > div:nth-of-type(1) {
    font-size: 20px;
    color: ${theme.color.gray6};
  }
  > div:nth-of-type(2) {
    font-size: 16px;
    color: ${theme.color.gray6};
  }
  > div:nth-of-type(3) {
    font-size: 16px;
    color: ${theme.color.gray6};
  }
`;

const LogContainer = styled.div`
  width: 100%;
  max-width: 1120px;
`;

const Label = styled.label`
  width: 100%;
  height: 22px;
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const Log = styled.div`
  width: 100%;
  height: 332px;
  border-radius: 10px;
  border: 1px solid ${theme.color.gray4};
  overflow-y: hidden;
  > div:nth-of-type(1) {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid ${theme.color.gray4};
  }
  > div:nth-of-type(2) {
    height: 296px;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.color.gray5};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.color.gray6};
    }
  }
`;

const LogText = styled.pre``;
