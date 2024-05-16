import styled from '@emotion/styled';
import { FirstContainer } from '@/components/Main/FirstContainer';
import { SecondContainer } from '@/components/Main/SecondContainer';
import { ThirdContainer } from '@/components/Main/ThirdContainer';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Cookie } from '@/utils/cookie';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

ChannelService.loadScript();

ChannelService.boot({
    "pluginKey": "46f7ede7-4e67-4236-baee-f778890e24c8", // fill your plugin key
});

export const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const data = Cookie.get('accessToken');
        if (data) {
            navigate('/team');
        }
    });
    return (
        <Wrapper>
            <FirstContainer />
            <SecondContainer />
            <ThirdContainer />
            <SubFooter>
                <div>FREE USE</div>
                <div>
                    대마고 학생이라면 <b>‘스퀘어 인프라’</b> 를<br />
                    <b>무료</b>로 사용할 수 있습니다.
                </div>
                <Button width={188} height={56} buttonColor="white" buttonStyle="solid" onClick={() => navigate('/login')}>
                    무료로 사용하기
                </Button>
            </SubFooter>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubFooter = styled.div`
  width: 100%;
  height: 540px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #6fe09e;
  > div:nth-of-type(1) {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
  > div:nth-of-type(2) {
    font-size: 56px;
    font-weight: 700;
    text-align: center;
    margin-top: 34px;
    margin-bottom: 60px;
    > b {
      color: white;
    }
  }
`;