import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Sidebar } from '@/components/common/sidebar';
import { Input } from '@/components/common/Input';
import { SelectBar } from '@/components/common/SelectBar';
import { XButton } from '@/components/common/XButton';
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/utils/apis/axios';
import { useNavigate } from 'react-router-dom';

const deployType: string[] = ['frontend', 'backend'];
const databaseType: string[] = ['mysql', 'redis'];
const deployType_Type: string[] = ['fe', 'be'];

export const TeamDeployCreate = () => {
  const navigate = useNavigate();
  const [dbSel, setDbSel] = useState<number | undefined>();
  const [mjSel, setMjSel] = useState<number | undefined>();

  const [data, setData] = useState({
    deploy_name: '',
    organization: '',
    repository: '',
    project_root_dir: '',
    one_line_description: '',
    deploy_type: '',
    use_redis: false,
    use_mysql: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { mutate } = useMutation({
    mutationFn: () => instance.post(`deploy?team_id=${'5e25c8b1-4f7c-4703-8752-45294dd87c6a'}`, data),
    onSuccess: (res) => {
      const { deploy_id } = res?.data;
      console.log(res?.data);
      navigate(`/team/1/deploy/${deploy_id}`);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Wrapper>
      <Sidebar />
      <ContainerWrapper>
        <Container>
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
                onChange={handleChange}
              />
              <Input
                width={426}
                label="깃허브 Organization 이름"
                placeholder="team-xquare"
                name="organization"
                onChange={handleChange}
              />
              <Input
                width={426}
                label="깃허브 Repository 이름"
                placeholder="example-backend"
                name="repository"
                onChange={handleChange}
              />
              <SelectBar
                selectedIndex={mjSel}
                onSelect={(item) => {
                  setMjSel(item);
                  setData({ ...data, deploy_type: deployType_Type[item as number] });
                }}
                values={deployType}
                label="배포 타입"
              />
              <SelectBar
                canCancle={true}
                placehold="사용하지 않음"
                selectedIndex={dbSel}
                onSelect={(item) => {
                  setDbSel(item);
                  setData({ ...data, use_redis: !!item, use_mysql: !!!item });
                }}
                values={databaseType}
                label="DB 사용여부"
              />
              <Input
                width={426}
                label="프로젝트 상위 경로"
                placeholder="/"
                name="project_root_dir"
                onChange={handleChange}
              />
              <Input
                width={426}
                label="한줄 설명"
                placeholder="이러이러한 프로젝트입니다."
                name="one_line_description"
                onChange={handleChange}
              />
            </InputWrapper>
            <ButtonWrapper>
              <XButton width={58} height={50} buttonStyle="ghost">
                취소
              </XButton>
              <XButton width={84} height={50} buttonStyle="solid" onClick={mutate}>
                생성하기
              </XButton>
            </ButtonWrapper>
          </Form>
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px + 200px);
  padding-left: 100px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
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

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.color.gray8};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
