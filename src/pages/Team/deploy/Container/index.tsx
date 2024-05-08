import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Tag } from '@/components/Team/Tag';
import { XButton } from '@/components/common/XButton';
import { ContainerAllType } from '@/utils/types/containerType';
import { getAllContainer } from '@/utils/apis/container';
import { useParams } from 'react-router-dom';

export const TeamDeployContainer = () => {
  const { deployUUID } = useParams();
  const [data, setData] = useState<ContainerAllType[]>();

  useEffect(() => {
    if (!deployUUID) return;

    getAllContainer(deployUUID).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <TitleContainer>
        <TeamName>에일리언즈 / dms-frontend</TeamName>
        <Title>프로젝트 배포</Title>
        <Describtion>프로젝트를 배포하기 위한 정보를 관리합니다.</Describtion>
      </TitleContainer>
      <UtilContainer>
        <div>
          <Label>배포 키</Label>
          <SecretKey>*******************</SecretKey>
        </div>
        <XButton width={70} height={46} buttonStyle="solid">
          재발급
        </XButton>
      </UtilContainer>
      {data ? (
        <>
          <Label>컨테이너</Label>
          <ContainerBoxContainer>
            {data.map((item, index) => {
              return (
                <ContainerBox key={index}>
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
                </ContainerBox>
              );
            })}
          </ContainerBoxContainer>
        </>
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
  align-items: end;
  width: 100%;
  max-width: 1120px;
`;

const SecretKey = styled.div`
  width: 426px;
  height: 46px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray5};
  color: ${theme.color.gray7};
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-left: 20px;
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
`;
