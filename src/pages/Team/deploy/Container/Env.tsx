import { Tag } from '@/components/Team/Tag';
import { Input } from '@/components/common/Input';
import { XButton } from '@/components/common/XButton';
import { theme } from '@/style/theme';
import { getDetailContainer } from '@/utils/apis/container';
import { getEnv } from '@/utils/apis/env';
import { ContainerDetailType } from '@/utils/types/containerType';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EyeImg from '@/assets/Eye.svg';
import EyeCloseImg from '@/assets/EyeClose.svg';

export const TeamDeployContainerEnv = () => {
  const { deployUUID, env } = useParams();
  const [data, setData] = useState<ContainerDetailType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [envList, setEnvList] = useState<Record<string, string>>({});
  const [originEnv, setOriginEnv] = useState<Record<string, string>>({});
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (deployUUID && env) {
      getDetailContainer(deployUUID, env).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (deployUUID && env) {
      getEnv(deployUUID, env).then((res) => {
        setEnvList(res.data);
        setOriginEnv(res.data);
        setOpenStates(Object.keys(res.data).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
      });
    }
  }, []);

  const handleAddEnv = () => {
    setEnvList((prevEnvList) => ({
      ...prevEnvList,
      '': '',
    }));
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      '': false,
    }));
  };

  const handleEnvChange = (key: string, value: string, isKey: boolean) => {
    setEnvList((prevEnvList) => {
      const newEnvList = { ...prevEnvList };
      if (isKey) {
        const oldValue = newEnvList[key];
        delete newEnvList[key];
        newEnvList[value] = oldValue;
        setOpenStates((prevOpenStates) => {
          const newOpenStates = { ...prevOpenStates };
          newOpenStates[value] = newOpenStates[key];
          delete newOpenStates[key];
          return newOpenStates;
        });
      } else {
        newEnvList[key] = value;
      }
      return newEnvList;
    });
  };

  const toggleOpen = (key: string) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [key]: !prevOpenStates[key],
    }));
  };

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>환경변수</TeamName>
        <Title>
          컨테이너 {data?.deploy_name}
          <Tag tag={'AVAILABLE'} />
        </Title>
      </TitleContainer>
      <EnvContainerWrapper>
        <div>Secret</div>
        <EnvContainer>
          <EnvContainerHeader>
            <div>key</div>
            <div>value</div>
            {!isEdit && <div onClick={() => setIsEdit(true)}>Edit Secret &gt;</div>}
          </EnvContainerHeader>
          {Object.entries(isEdit ? envList : originEnv).map(([key, value], idx) => (
            <EnvContent key={idx} isEdit={isEdit}>
              <div>
                {isEdit ? (
                  <Input width={314} value={key} onChange={(e) => handleEnvChange(key, e.target.value, true)} />
                ) : (
                  key
                )}
              </div>
              <div>
                {isEdit ? (
                  <Input width={740} value={value} onChange={(e) => handleEnvChange(key, e.target.value, false)} />
                ) : (
                  <>
                    <img
                      src={openStates[key] ? EyeImg : EyeCloseImg}
                      alt="View password"
                      onClick={() => toggleOpen(key)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div style={{ minHeight: '24px', display: 'flex', alignItems: 'center' }}>
                      {openStates[key] ? value : '********'}
                    </div>
                  </>
                )}
              </div>
            </EnvContent>
          ))}
          {isEdit && <EnvPlus onClick={handleAddEnv}>+</EnvPlus>}
        </EnvContainer>
      </EnvContainerWrapper>
      {isEdit && (
        <ButtonContainer>
          <XButton
            width={58}
            height={50}
            onClick={() => {
              setIsEdit(false);
              setEnvList(originEnv);
            }}
          >
            저장
          </XButton>
        </ButtonContainer>
      )}
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

const EnvContainerWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  padding-bottom: 54px;
  > div:nth-child(1) {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.color.mainLight1};
  }
`;

const EnvContainer = styled.div`
  width: 100%;
`;

const EnvContainerHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.gray5};
  border-top: 1px solid ${theme.color.gray4};
  border-bottom: 1px solid ${theme.color.gray4};
  position: relative;
  > div:nth-child(1) {
    width: 334px;
  }
  > div:nth-child(2) {
    width: 786px;
  }
  > div:nth-child(3) {
    position: absolute;
    right: 14px;
    top: auto;
    bottom: auto;
    color: ${theme.color.gray7};
    cursor: pointer;
  }
`;

const EnvContent = styled.div<{ isEdit: boolean }>`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: start;
  border-bottom: 1px solid ${theme.color.gray4};
  font-size: 16px;
  font-weight: 500;
  > div:nth-child(1) {
    width: 334px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  > div:nth-child(2) {
    width: 786px;
    min-height: 60px;
    padding: ${({ isEdit }) => !isEdit && '18px'} 0;
    display: flex;
    align-items: ${({ isEdit }) => (isEdit ? 'center' : 'start')};
    gap: 10px;
    word-break: break-all;
  }
`;

const EnvPlus = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.color.gray4};
  color: ${theme.color.gray4};
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  justify-content: end;
  padding-bottom: 200px;
`;
