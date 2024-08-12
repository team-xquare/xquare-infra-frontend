import { Input } from '@/components/common/Input';
import { LayoutBox } from '@/components/common/LayoutBox';
import { XButton } from '@/components/common/XButton';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { activeAlert } from '@/utils/apis/container';

export const TeamDeployContainerAlertActive = () => {
  const { deployUUID, env } = useParams();
  const [mType, setMType] = useState<'DISCORD' | 'SLACK'>('DISCORD');
  const [hook, setHook] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHook(e.target.value);
  };

  const onSubmit = () => {
    if (!deployUUID || !env) return;

    activeAlert(deployUUID, env, {
      webhook_type: mType,
      webhook_url: hook,
    });
  };

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>알림을 받아보세요.</TeamName>
        <Title>Alert</Title>
      </TitleContainer>
      <StepContainerWrapper>
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>1</NumberBox>
          <LayoutBox flex="column" gap={6}>
            <Text>메신저 종류를 선택해주세요</Text>
            <LayoutBox flex="row" gap={16}>
              <DeployTypeBox isSelected={mType === 'DISCORD'} onClick={() => setMType('DISCORD')}>
                DISCORD
              </DeployTypeBox>
              <DeployTypeBox isSelected={mType === 'SLACK'} onClick={() => setMType('SLACK')}>
                SLACK
              </DeployTypeBox>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>1</NumberBox>
          <LayoutBox flex="column" gap={6}>
            <Text>Webhook URL을 설정해주세요</Text>
            <Input
              width={328}
              height={46}
              placeholder="ex ) https://discord.com/api/webhooks/..."
              onChange={onChange}
            />
          </LayoutBox>
        </LayoutBox>
      </StepContainerWrapper>
      <BottomContainer>
        <XButton
          width={80}
          height={50}
          onClick={() => {
            onSubmit();
          }}
        >
          활성화
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

const StepContainerWrapper = styled.div`
  max-width: 1120px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const NumberBox = styled.div`
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${theme.color.main};
  color: ${theme.color.gray1};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.color.gray8};
  line-height: 28px;
`;

const DeployTypeBox = styled.div<{ isSelected: boolean }>`
  width: 160px;
  height: 46px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s linear;
  color: ${({ isSelected }) => (isSelected ? theme.color.mainDark1 : theme.color.gray5)};
  background-color: ${({ isSelected }) => (isSelected ? theme.color.mainLight2 : theme.color.gray1)};
  border: 1px solid ${({ isSelected }) => (isSelected ? theme.color.mainDark1 : theme.color.gray5)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
