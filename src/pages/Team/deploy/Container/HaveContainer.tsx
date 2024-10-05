import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Tag } from '@/components/Team/Tag';
import { XButton } from '@/components/common/XButton';
import { ContainerAllType } from '@/utils/types/containerType';
import { getAllContainer, getCPU, getMemory } from '@/utils/apis/container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContainerGraph } from '@/components/graph/ContainerGraph';
import { DeployDetailType } from '@/utils/types/deployType';
import { getDetailDeploy } from '@/utils/apis/deploy';
import { LimitBox } from '@/components/Layouts/LimitBox';

type DateValueMap = {
  [dateString: string]: string;
};

type JsonData = {
  [key: number]: DateValueMap;
};

export const TeamDeployHaveContainer = () => {
  const link = useNavigate();
  const { teamUUID, deployUUID } = useParams();
  const [containerData, setContainerData] = useState<ContainerAllType[]>();
  const [prodCpu, setProdCpu] = useState<JsonData>();
  const [prodMemory, setProdMemory] = useState<JsonData>();
  const [stagCpu, setStagCpu] = useState<JsonData>();
  const [stagMemory, setStagMemory] = useState<JsonData>();
  const [deployData, setDeployData] = useState<DeployDetailType>();

  useEffect(() => {
    if (!deployUUID) return;

    getDetailDeploy(deployUUID).then((res) => {
      setDeployData(res.data);
    });
  }, []);

  useEffect(() => {
    if (!deployUUID) return;

    getAllContainer(deployUUID).then((res) => {
      setContainerData(res.data);
    });
  }, []);

  useEffect(() => {
    if (!deployUUID || !containerData || containerData.length > 0) {
      containerData?.forEach((item) => {
        if (item.container_environment === 'prod' && deployUUID) {
          getCPU(deployUUID, 'prod').then((res) => {
            setProdCpu(res.data);
          });
          getMemory(deployUUID, 'prod').then((res) => {
            setProdMemory(res.data);
          });
          return;
        } else if (item.container_environment === 'stag' && deployUUID) {
          getCPU(deployUUID, 'stag').then((res) => {
            setStagCpu(res.data);
          });
          getMemory(deployUUID, 'stag').then((res) => {
            setStagMemory(res.data);
          });
          return;
        }
      });
    }
  }, [containerData]);

  return (
    <Wrapper>
      <TitleContainer>
        {deployData && (
          <TeamName>
            {deployData.team_name_ko} / {deployData.deploy_name}
          </TeamName>
        )}
        <Title>프로젝트 배포</Title>
        <Describtion>프로젝트를 배포하기 위한 정보를 관리합니다.</Describtion>
      </TitleContainer>
      <UtilContainer>
        <Link to={`/team/${teamUUID}/deploy/${deployUUID}/container/edit`}>Container Setting</Link>
      </UtilContainer>
      {containerData && containerData.length > 0 ? (
        <LimitBox>
          <Label>컨테이너</Label>
          <ContainerBoxContainer>
            {containerData.map((item, index) => {
              return (
                <ContainerBox
                  key={index}
                  onClick={() => {
                    link(`/team/${teamUUID}/deploy/${deployUUID}/container/${item.container_environment}`);
                  }}
                >
                  <div>
                    <div>
                      {item.container_name}
                      <Tag tag={item.container_environment} />
                      <Tag tag={item.container_status} />
                    </div>
                    <div>
                      <span>{item.repository}</span>
                      <span>{item.domain}</span>
                      <span>마지막 배포: {item.last_deploy.split('T')[0]}</span>
                    </div>
                  </div>
                  <div>
                    {item.container_environment === 'stag' && stagMemory && Object.keys(stagMemory).length !== 0 && (
                      <div>
                        <span>메모리</span>
                        <ContainerGraph jsonData={stagMemory} />
                      </div>
                    )}
                    {item.container_environment === 'stag' && stagCpu && Object.keys(stagCpu).length !== 0 && (
                      <div>
                        <span>CPU</span>
                        <ContainerGraph jsonData={stagCpu} />
                      </div>
                    )}
                    {item.container_environment === 'prod' && prodMemory && Object.keys(prodMemory).length !== 0 && (
                      <div>
                        <span>메모리</span>
                        <ContainerGraph jsonData={prodMemory} />
                      </div>
                    )}
                    {item.container_environment === 'prod' && prodCpu && Object.keys(prodCpu).length !== 0 && (
                      <div>
                        <span>CPU</span>
                        <ContainerGraph jsonData={prodCpu} />
                      </div>
                    )}
                  </div>
                </ContainerBox>
              );
            })}
          </ContainerBoxContainer>
        </LimitBox>
      ) : (
        <TipBox>
          아직 프로젝트에서 배포된 정보가 없습니다.
          <br />
          등록한 배포에 대한 액션이 동작하면 이 곳에서 배포된 컨테이너를 확인할 수 있습니다.
          <br />
          배포 액션을 설정하는 방법은 여기에서 확인해주세요!
        </TipBox>
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

const UtilContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  width: 100%;
  max-width: 1120px;
  & > a {
    color: ${theme.color.mainDark1};
    cursor: pointer;
    transition: 0.1s linear;
    :hover {
      color: ${theme.color.mainLight1};
    }
  }
`;

const Label = styled.label`
  width: 100%;
  max-width: 1120px;
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

const TipBox = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 190px;
  color: ${theme.color.gray5};
  border: 1px ${theme.color.gray5} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 20px;
  text-align: center;
`;

const ContainerBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 1120px;
`;

const ContainerBox = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 1120px;
  height: 170px;
  background-color: ${theme.color.gray1};
  padding: 0 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.color.gray5};
  border-radius: 6px;
  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    > div:nth-of-type(1) {
      font-size: 20px;
      font-weight: 500;
      display: flex;
      gap: 6px;
      color: ${theme.color.gray8};
    }
    > div:nth-of-type(2) {
      color: ${theme.color.gray6};
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-size: 14px;
      }
      > span:nth-of-type(1) {
        font-size: 20px;
      }
    }
  }
  > div:nth-of-type(2) {
    display: flex;
    gap: 20px;
    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      > span {
        font-size: 14px;
        color: ${theme.color.gray6};
      }
    }
  }
`;
