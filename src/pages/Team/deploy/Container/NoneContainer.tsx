import { getDetailDeploy } from '@/utils/apis/deploy';
import { DeployDetailType } from '@/utils/types/deployType';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { LayoutBox } from '@/components/common/LayoutBox';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { XButton } from '@/components/common/XButton';
import { nodeVersion, jdkVersion } from '@/assets/versions';
import {
  writeContainerConfig,
  writeContainerGradle,
  writeContainerNginx,
  writeContainerNode,
} from '@/utils/apis/container';

const renderTypeList = ['csr', 'ssr'];
const frameworkList = ['spring boot', 'node'];

export const TeamDeployNoneContainer = () => {
  const { deployUUID } = useParams();
  const [deployData, setDeployData] = useState<DeployDetailType>();

  // 공통 상태
  const [deployType, setDeployType] = useState<'frontend' | 'backend'>('frontend');
  const [renderType, setRenderType] = useState<'csr' | 'ssr'>('csr');
  const [framework, setFramework] = useState<'spring boot' | 'node'>('node');

  // stag 환경 상태
  const [stagPort, setStagPort] = useState<string>('');
  const [stagBranch, setStagBranch] = useState<string>('');
  const [stagDomain, setStagDomain] = useState<string>('');

  // prod 환경 상태
  const [prodPort, setProdPort] = useState<string>('');
  const [prodBranch, setProdBranch] = useState<string>('');
  const [prodDomain, setProdDomain] = useState<string>('');

  // 빌드 관련 상태
  const [selectedNodeVersion, setSelectedNodeVersion] = useState<string>(nodeVersion[0]);
  const [selectedJdkVersion, setSelectedJdkVersion] = useState<string>(jdkVersion[0]);
  const [buildCommand, setBuildCommand] = useState<string>('');
  const [outputDir, setOutputDir] = useState<string>('');

  useEffect(() => {
    if (!deployUUID) return;

    getDetailDeploy(deployUUID).then((res) => {
      setDeployData(res.data);
    });
  }, []);

  const generateRequestData = (): {
    stag: { branch: string; container_port: string; domain: string };
    prod: { branch: string; container_port: string; domain: string };
    language: string;
    node_version?: string;
    build_commands?: string[];
    command?: string;
    output_dir?: string;
    jdk_version?: string;
  } => {
    const commonData = {
      stag: {
        branch: stagBranch,
        container_port: stagPort,
        domain: `${stagDomain}.xquare.app`,
      },
      prod: {
        branch: prodBranch,
        container_port: prodPort,
        domain: `${prodDomain}.xquare.app`,
      },
      language: deployType === 'frontend' || framework === 'node' ? 'javascript' : 'java',
    };

    let specificData = {};
    if (deployType === 'frontend') {
      specificData =
        renderType === 'csr'
          ? {
              node_version: selectedNodeVersion,
              build_commands: [buildCommand],
              command: 'yarn dev',
            }
          : {
              node_version: selectedNodeVersion,
              build_commands: [buildCommand],
              output_dir: outputDir,
            };
    } else {
      // backend
      if (framework === 'spring boot') {
        specificData = {
          jdk_version: selectedJdkVersion,
          output_dir: '/build/libs/*.jar',
          build_commands: [buildCommand || './gradlew build -x test'],
        };
      } else {
        // node
        specificData = {
          node_version: selectedNodeVersion,
          build_commands: [buildCommand],
          command: 'yarn dev',
        };
      }
    }

    return { ...commonData, ...specificData };
  };

  const onSubmit = () => {
    const requestData = generateRequestData();

    if (!deployUUID) return;

    writeContainerConfig(deployUUID, {
      prod: requestData.prod,
      stag: requestData.stag,
      language: requestData.language,
    });

    setTimeout(() => {
      if (
        deployType === 'backend' &&
        framework === 'spring boot' &&
        requestData.build_commands &&
        requestData.jdk_version &&
        requestData.output_dir
      ) {
        writeContainerGradle(deployUUID, 'prod', {
          build_commands: requestData.build_commands,
          jdk_version: requestData.jdk_version,
          output_dir: requestData.output_dir,
        });
        writeContainerGradle(deployUUID, 'stag', {
          build_commands: requestData.build_commands,
          jdk_version: requestData.jdk_version,
          output_dir: requestData.output_dir,
        });
      } else if (
        (deployType === 'backend' &&
          framework === 'node' &&
          requestData.build_commands &&
          requestData.command &&
          requestData.node_version) ||
        (deployType === 'frontend' &&
          renderType === 'ssr' &&
          requestData.build_commands &&
          requestData.command &&
          requestData.node_version)
      ) {
        writeContainerNode(deployUUID, 'prod', {
          node_version: requestData.node_version,
          build_commands: requestData.build_commands,
          command: requestData.command,
        });
        writeContainerNode(deployUUID, 'stag', {
          node_version: requestData.node_version,
          build_commands: requestData.build_commands,
          command: requestData.command,
        });
      } else if (
        deployType === 'frontend' &&
        renderType === 'csr' &&
        requestData.build_commands &&
        requestData.output_dir &&
        requestData.node_version
      ) {
        writeContainerNginx(deployUUID, 'prod', {
          node_version: requestData.node_version,
          build_commands: requestData.build_commands,
          output_dir: requestData.output_dir,
        });
        writeContainerNginx(deployUUID, 'stag', {
          node_version: requestData.node_version,
          build_commands: requestData.build_commands,
          output_dir: requestData.output_dir,
        });
      }
    }, 1500);
  };

  return (
    <Wrapper>
      <TitleContainer>
        {deployData && (
          <TeamName>
            {deployData.team_name_ko} / {deployData.deploy_name}
          </TeamName>
        )}
        <Title>컨테이너</Title>
        <Describtion>정의한 배포에 대한 컨테이너를 인프라에 생성, 관리합니다.</Describtion>
      </TitleContainer>
      <StepContainerWrapper>
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>1</NumberBox>
          <LayoutBox flex="column" gap={6}>
            <Text>아래 정보를 입력해 주세요!</Text>
            <LayoutBox flex="row" gap={16}>
              <DeployTypeBox isSelected={deployType === 'frontend'} onClick={() => setDeployType('frontend')}>
                frontend
              </DeployTypeBox>
              <DeployTypeBox isSelected={deployType === 'backend'} onClick={() => setDeployType('backend')}>
                backend
              </DeployTypeBox>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>2</NumberBox>
          <LayoutBox flex="column" gap={6}>
            <Text>아래 정보를 입력해 주세요!</Text>
            <LayoutBox flex="row" gap={60}>
              <LayoutBox flex="column" gap={10}>
                <Text>개발 환경(stag)</Text>
                <Input
                  width={328}
                  height={46}
                  placeholder="서비스 port"
                  value={stagPort}
                  onChange={(e) => setStagPort(e.target.value)}
                />
                <Input
                  width={328}
                  height={46}
                  placeholder="Github Branch"
                  value={stagBranch}
                  onChange={(e) => setStagBranch(e.target.value)}
                />
                <LayoutBox flex="row" gap={10} align="center">
                  <Input
                    width={220}
                    height={46}
                    placeholder="your sub domain"
                    value={stagDomain}
                    onChange={(e) => setStagDomain(e.target.value)}
                  />
                  <Text>.xquare.app</Text>
                </LayoutBox>
              </LayoutBox>
              <LayoutBox flex="column" gap={10}>
                <Text>운영 환경(prod)</Text>
                <Input
                  width={328}
                  height={46}
                  placeholder="서비스 port"
                  value={prodPort}
                  onChange={(e) => setProdPort(e.target.value)}
                />
                <Input
                  width={328}
                  height={46}
                  placeholder="Github Branch"
                  value={prodBranch}
                  onChange={(e) => setProdBranch(e.target.value)}
                />
                <LayoutBox flex="row" gap={10} align="center">
                  <Input
                    width={220}
                    height={46}
                    placeholder="your sub domain"
                    value={prodDomain}
                    onChange={(e) => setProdDomain(e.target.value)}
                  />
                  <Text>.xquare.app</Text>
                </LayoutBox>
              </LayoutBox>
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>
        <LayoutBox width="100%" align="start" gap={24}>
          <NumberBox>3</NumberBox>
          <LayoutBox flex="column" gap={6}>
            <Text>본인의 프로젝트에 맞게 선택해 주세요.</Text>
            <LayoutBox flex="column" gap={90}>
              <div style={{ width: '180px' }}>
                <SelectBar
                  selectedIndex={
                    deployType === 'frontend' ? renderTypeList.indexOf(renderType) : frameworkList.indexOf(framework)
                  }
                  onSelect={(index) => {
                    if (index !== undefined) {
                      if (deployType === 'frontend') {
                        setRenderType(renderTypeList[index] as 'csr' | 'ssr');
                      } else {
                        setFramework(frameworkList[index] as 'spring boot' | 'node');
                      }
                    }
                  }}
                  values={deployType === 'frontend' ? renderTypeList : frameworkList}
                  label={deployType === 'frontend' ? '렌더링 방식을 설정해 주세요.' : '프레임워크를 선택해주세요'}
                />
              </div>
              <div style={{ width: '180px' }}>
                <SelectBar
                  selectedIndex={
                    deployType === 'frontend' || framework === 'node'
                      ? nodeVersion.indexOf(selectedNodeVersion)
                      : jdkVersion.indexOf(selectedJdkVersion)
                  }
                  onSelect={(index) => {
                    if (index !== undefined) {
                      if (deployType === 'frontend' || framework === 'node') {
                        setSelectedNodeVersion(nodeVersion[index]);
                      } else {
                        setSelectedJdkVersion(jdkVersion[index]);
                      }
                    }
                  }}
                  values={deployType === 'frontend' || framework === 'node' ? nodeVersion : jdkVersion}
                  label={
                    deployType === 'frontend' || framework === 'node'
                      ? 'node 버전을 선택해주세요'
                      : 'jdk 버전을 선택해주세요'
                  }
                />
              </div>
              <Input
                width={328}
                height={46}
                placeholder={deployType === 'frontend' ? 'ex) yarn build' : 'ex) ./gradlew build -x test'}
                label="빌드 명령어를 입력해주세요"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
              />
              {(deployType === 'backend' || (deployType === 'frontend' && renderType === 'csr')) && (
                <Input
                  width={328}
                  height={46}
                  placeholder="ex) dist"
                  label="build output directory를 설정해 주세요."
                  value={outputDir}
                  onChange={(e) => setOutputDir(e.target.value)}
                />
              )}
            </LayoutBox>
          </LayoutBox>
        </LayoutBox>
      </StepContainerWrapper>
      <ButtonWrapper>
        <XButton width={84} height={50} buttonStyle="solid" onClick={onSubmit}>
          생성하기
        </XButton>
      </ButtonWrapper>
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
`;

const Describtion = styled.div`
  font-size: 24px;
  font-weight: 100;
  color: ${theme.color.gray8};
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

const StepContainerWrapper = styled.div`
  max-width: 1120px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
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

const ButtonWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
  padding-bottom: 200px;
`;
