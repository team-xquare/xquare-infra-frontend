import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { XButton } from '@/components/common/XButton';
import { useNavigate, useParams } from 'react-router-dom';
import { DeployCreateType, DeployType } from '@/utils/types/deployType';
import { deployCreate } from '@/utils/apis/deploy';

const selectType: string[] = ['사용하지 않음', '사용함'];
const deployType: DeployType[] = ['fe', 'be'];

export const TeamDeployCreate = () => {
  const { teamUUID } = useParams();
  const link = useNavigate();
  const [mySQL, setMySQL] = useState<number | undefined>(0);
  const [redis, setRedis] = useState<number | undefined>(0);
  const [deployIndex, setDeployIndex] = useState<number | undefined>();

  const [data, setData] = useState<DeployCreateType>({
    deploy_name: '',
    organization: '',
    repository: '',
    project_root_dir: '',
    one_line_description: '',
    deploy_type: '',
    use_redis: false,
    use_mysql: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = () => {
    if (!teamUUID) return;

    console.log(data);

    deployCreate(teamUUID, data).then((res) => {
      link(`/team/${teamUUID}/deploy/${res.data.deploy_id}`);
    });
  };

  useEffect(() => {
    setData({ ...data, use_redis: Boolean(redis), use_mysql: Boolean(mySQL) });
  }, [mySQL, redis]);

  useEffect(() => {
    if (deployIndex === undefined) return;
    setData({ ...data, deploy_type: deployType[deployIndex] });
  }, [deployIndex]);

  return (
    <Wrapper>
      <TitleContainer>
        <Title>배포 생성</Title>
      </TitleContainer>
      <Form>
        <InputWrapper>
          <Input
            width={328}
            label="배포 이름 (영어)"
            placeholder="배포 이름 (영어)"
            name="deploy_name"
            onChange={onChange}
          />
          <Input
            width={426}
            label="깃허브 Organization 이름"
            placeholder="team-xquare"
            name="organization"
            onChange={onChange}
          />
          <Input
            width={426}
            label="깃허브 Repository 이름"
            placeholder="example-backend"
            name="repository"
            onChange={onChange}
          />
          <SelectBar selectedIndex={deployIndex} onSelect={setDeployIndex} values={deployType} label="배포 타입" />
          <SelectbarContainer>
            <SelectBar
              canCancle={true}
              placehold="사용하지 않음"
              selectedIndex={mySQL}
              onSelect={setMySQL}
              values={selectType}
              label="MySQL 사용여부"
            />
            <SelectBar
              canCancle={true}
              placehold="사용하지 않음"
              selectedIndex={redis}
              onSelect={setRedis}
              values={selectType}
              label="Redis 사용여부"
            />
          </SelectbarContainer>
          <Input width={426} label="프로젝트 상위 경로" placeholder="/" name="project_root_dir" onChange={onChange} />
          <Input
            width={426}
            label="한줄 설명"
            placeholder="이러이러한 프로젝트입니다."
            name="one_line_description"
            onChange={onChange}
          />
        </InputWrapper>
        <ButtonWrapper>
          <XButton width={58} height={50} buttonStyle="ghost">
            취소
          </XButton>
          <XButton width={84} height={50} buttonStyle="solid" onClick={onSubmit}>
            생성하기
          </XButton>
        </ButtonWrapper>
      </Form>
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

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  max-width: 1120px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 24px;
`;

const ButtonWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
  gap: 20px;
`;

const SelectbarContainer = styled.div`
  display: flex;
  gap: 20px;
`;
