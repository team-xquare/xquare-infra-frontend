import { Input } from '@/components/common/Input';
import { XButton } from '@/components/common/XButton';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { LayoutBox } from '@/components/common/LayoutBox';
import ExamImg1Src from '@/assets/example/ExamImg1.png';
import ExamImg2Src from '@/assets/example/ExamImg2.png';
import ExamImg3Src from '@/assets/example/ExamImg3.png';

export const TeamDeployNoneContainer = () => {
  return (
    <LayoutBox width="100%" flex="column" align="center" gap={48} height="4728px">
      <LayoutBox width="100%" max={1120} flex="column" gap={4}>
        <TeamName>에일리언즈</TeamName>
        <Title>컨테이너</Title>
        <Describtion>정의한 배포에 대한 컨테이너를 인프라에 생성, 관리합니다.</Describtion>
        <Text>
          GitHub Actions 워크플로우를 사용해 프로젝트를 Xquare 서버에 배포하고 관리할 수 있습니다.
          <br />
          아래 설명에 따라 워크플로우를 설정하여 서버를 배포해보세요.
        </Text>
      </LayoutBox>
      <LayoutBox width="100%" max={1120} gap={40} flex="column">
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>1</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <Text>프로젝트 레포지토리 정보가 정상적으로 등록되었습니다!</Text>
            <LayoutBox align="center" gap={20}>
              <WrapperBox width={496} heigth={72} radius={10}>
                https://github.com/team-aliens/DMS-Backend
              </WrapperBox>
              <XButton width={80} height={58}>
                재확인
              </XButton>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>2</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <Text>레포지토리의 .xquare/config.yaml 경로에 배포를 위한 설정 파일을 등록해주세요.</Text>
            <SecondStepContainer>
              <Text>아래 정보를 입력하여 설정 파일을 생성해보세요!</Text>
              <LayoutBox justify="space-between">
                <WrapperBox width={440} heigth={160} radius={20}></WrapperBox>
                <LayoutBox flex="column" gap={20}>
                  <Input width={328} height={48} label="요청을 받을 포트" />
                  <LayoutBox flex="column" gap={6}>
                    <Text>배포 URL 설정</Text>
                    <LayoutBox gap={20}>
                      <XButton buttonStyle="solid" width={114} height={56}>
                        prefix 사용
                      </XButton>
                      <XButton buttonStyle="ghost" width={244} height={56}>
                        xquare.app 하위 도메인 사용
                      </XButton>
                    </LayoutBox>
                  </LayoutBox>
                </LayoutBox>
              </LayoutBox>
            </SecondStepContainer>
            <LayoutBox align="center" gap={20}>
              <WrapperBox width={260} heigth={72} radius={10}>
                Config 파일 생성 완료
              </WrapperBox>
              <XButton width={80} height={58}>
                재확인
              </XButton>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>3</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <Text>GitHub repository에 Dockerfile을 생성합니다.</Text>
            <LayoutBox align="center" gap={20}>
              <WrapperBox width={260} heigth={72} radius={10}>
                Dockerfile 생성 완료
              </WrapperBox>
              <XButton width={80} height={58}>
                재확인
              </XButton>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>4</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <Text>Github Personal Access Token을 발급받습니다. repo 권한을 반드시 포함해야 합니다.</Text>
            <LayoutBox flex="column" gap={40}>
              <img src={ExamImg1Src} />
              <div>
                <Text>발급받은 Personal Access Token을 Github Actions Secret으로 등록합니다.</Text>
                <Text>
                  (Repository Setting {'>'} Secrets and variables {'>'} Actions)
                </Text>
              </div>
              <img src={ExamImg2Src} />
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>5</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <div>
              <Text>아래 버튼을 눌러 배포 키를 발급받습니다. 발급받은 배포 키는 한 번만 확인할 수 있습니다.</Text>
              <Text>
                발급받은 Access key를 Repository의 Secret으로 등록합니다. (Repository Setting {'>'} Secrets and
                variables {'>'} Actions)
              </Text>
            </div>
            <LayoutBox gap={10} flex="column">
              <LayoutBox align="end" gap={10}>
                <Input width={426} height={46} label="배포 키" />
                <XButton width={80} height={46}>
                  발급받기
                </XButton>
              </LayoutBox>
              <img src={ExamImg3Src} />
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>6</NumberBox>
          <LayoutBox flex="column" gap={20}>
            <div>
              <Text>.github/workflows 경로 아래에 배포에 대한 Git Action을 작성합니다.</Text>
              <Text>xquare action을 넣을 job 아래에 OIDC 권한을 허용해줍니다.</Text>
            </div>
            <WrapperBox width={880} heigth={378} radius={20}></WrapperBox>
            <Text>자신의 프로젝트에 대한 이미지를 빌드하기 전 필요한 필요한 동작이 있다면 추가합니다.</Text>
            <SixthStepContainer></SixthStepContainer>
          </LayoutBox>
        </LayoutBox>

        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>7</NumberBox>
          <Text>배포 Action을 실행하여 애플리케이션을 배포합니다.</Text>
        </LayoutBox>
      </LayoutBox>
    </LayoutBox>
  );
};

const TeamName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.color.gray5};
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
`;

const Describtion = styled.div`
  font-size: 24px;
  font-weight: 100;
  color: ${theme.color.gray8};
  margin-bottom: 26px;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.color.gray8};
  line-height: 28px;
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

const WrapperBox = styled.div<{ width: number; heigth: number; radius: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ heigth }) => `${heigth}px`};
  border-radius: ${({ radius }) => `${radius}px`};
  background-color: ${theme.color.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${theme.color.gray7};
`;

const SecondStepContainer = styled.div`
  width: 956px;
  height: 300px;
  border-radius: 6px;
  border: 1px solid ${theme.color.gray5};
  padding: 20px 46px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SixthStepContainer = styled.div`
  width: 980px;
  height: 1388px;
  border-radius: 6px;
  border: 1px solid ${theme.color.gray5};
  padding: 20px 46px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
