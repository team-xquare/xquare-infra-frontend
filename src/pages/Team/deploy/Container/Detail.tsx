import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Tag } from '@/components/Team/Tag';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ContainerDetailType } from '@/utils/types/containerType';
import { getDetailContainer } from '@/utils/apis/container';
import { Icon } from '@iconify/react';

export const TeamDeployContainerDetail = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const { deployUUID, env } = useParams();
  const { messages } = useWebSocket({
    url: `${import.meta.env.VITE_SERVER_SOCKET_URL}/logs?deployId=${deployUUID}&environment=${env}`,
  });
  const [log, setLog] = useState<string[]>([]);
  const [data, setData] = useState<ContainerDetailType>();
  const logInnerContainerRef = useRef<HTMLDivElement>(null);

  const bodySelector = document.querySelector('body');

  useEffect(() => {
    if (deployUUID && env) {
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    setLog(messages);
    if (logInnerContainerRef.current) {
      const { current: logInnerContainer } = logInnerContainerRef;
      requestAnimationFrame(() => {
        logInnerContainer.scrollTop = logInnerContainer.scrollHeight;
      });
    }
  }, [messages]);

  return (
    <Wrapper>
      {isFull && (
        <LogModalContainer>
          <Log isDark={isDark} isFull={isFull}>
            <div>
              <span
                onClick={() => {
                  setIsDark(!isDark);
                }}
              >
                <Icon
                  icon={isDark ? 'material-symbols-light:dark-mode' : 'tabler:sun-filled'}
                  color={isDark ? 'white' : 'black'}
                />
              </span>
              <span
                onClick={() => {
                  setIsFull(false);
                  if (!bodySelector) return;
                  bodySelector.style.overflowY = 'auto';
                }}
              >
                <Icon icon={'maki:cross'} color={isDark ? 'white' : 'black'} />
              </span>
            </div>
            <div ref={logInnerContainerRef}>
              {log?.length > 0 && (
                <>
                  {log.map((item, index) => {
                    if (item === '') return null;
                    return (
                      <LogText key={index} isDark={isDark}>
                        {item}
                      </LogText>
                    );
                  })}
                </>
              )}
            </div>
          </Log>
        </LogModalContainer>
      )}
      <TitleContainer>
        <TeamName>{data?.team_name_ko}</TeamName>
        <Title>
          컨테이너 {data?.deploy_name}
          <Tag tag={'AVAILABLE'} />
        </Title>
        <Describtion>
          <div>
            {data?.team_name_en}/{data?.deploy_name}
          </div>
          <div>{data?.domain}</div>
          <div>마지막 배포: {data?.last_deploy}</div>
        </Describtion>
      </TitleContainer>
      <LogContainer>
        {!isFull && (
          <>
            <Label isFull={isFull}>로그</Label>
            <Log isDark={isDark} isFull={isFull}>
              <div>
                <span
                  onClick={() => {
                    setIsDark(!isDark);
                  }}
                >
                  <Icon
                    icon={isDark ? 'material-symbols-light:dark-mode' : 'tabler:sun-filled'}
                    color={isDark ? 'white' : 'black'}
                  />
                </span>
                <span
                  onClick={() => {
                    setIsFull(true);
                    if (!bodySelector) return;
                    bodySelector.style.overflowY = 'hidden';
                  }}
                >
                  <Icon icon={'icon-park-outline:internal-expansion'} color={isDark ? 'white' : 'black'} />
                </span>
              </div>
              <div ref={logInnerContainerRef}>
                {log?.length > 0 && (
                  <>
                    {log.map((item, index) => {
                      if (item === '') return null;
                      return (
                        <LogText key={index} isDark={isDark}>
                          {item}
                        </LogText>
                      );
                    })}
                  </>
                )}
              </div>
            </Log>
          </>
        )}
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

const LogModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Label = styled.label<{ isFull: boolean }>`
  width: 100%;
  height: 22px;
  display: ${({ isFull }) => (isFull ? 'none' : null)};
  cursor: default;
  font-size: 14px;
  font-weight: 400;
  color: ${theme.color.gray6};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 6px;
`;

const Log = styled.div<{ isDark: boolean; isFull: boolean }>`
  width: 100%;
  height: ${({ isFull }) => (isFull ? '100%' : '500px')};
  border-radius: 10px;
  border: 1px solid ${theme.color.gray4};
  overflow-y: hidden;
  background-color: ${({ isDark }) => (isDark ? '#333333' : 'white')};
  > div:nth-of-type(1) {
    width: 100%;
    height: ${({ isFull }) => (isFull ? '50px' : '36px')};
    border-bottom: 1px solid ${theme.color.gray4};
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 20px;
    gap: 20px;
    span {
      cursor: pointer;
      & :hover {
        background-color: lightgray;
      }
    }
  }
  > div:nth-of-type(2) {
    height: ${({ isFull }) => (isFull ? 'calc(100% - 50px)' : '464px')};
    overflow-y: auto;
    padding: 20px 0 20px;

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

const LogText = styled.pre<{ isDark: boolean }>`
  padding: 0 20px 0 20px;
  font-variant-numeric: tabular-nums;
  color: ${({ isDark }) => (isDark ? '#CCCCCC' : theme.color.gray9)};
`;
