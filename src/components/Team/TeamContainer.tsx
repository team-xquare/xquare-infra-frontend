import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { Tag } from './Tag';
import React from 'react';

type TagType = 'club' | 'team' | 'alone' | 'etc';

type TeamType = {
  name: string;
  admin: string;
  deploy: string[];
  tag: TagType;
};

export const TeamContainer = ({ name, admin, deploy, tag }: TeamType) => {
  return (
    <Wrapper>
      <div>
        {name}
        <Tag tag={tag} />
      </div>
      <div>관리자: {admin}</div>
      <div>
        배포:&nbsp;
        {deploy.map((element, index) => {
          switch (index) {
            case 0:
              return (
                <React.Fragment key={index}>
                  {element}
                  {deploy.length > 1 && ', '}
                </React.Fragment>
              );
            case 1:
              return <React.Fragment key={index}>{element} </React.Fragment>;
            case 2:
              return (
                <React.Fragment key={index}>{deploy.length > 2 ? <>등 {deploy.length - 2}개</> : <></>}</React.Fragment>
              );
            default:
              return null;
          }
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 134px;
  padding: 20px 40px;
  border-radius: 6px;
  border: 1px ${theme.color.gray5} solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 400;
  color: ${theme.color.gray6};
  & :nth-child(1) {
    display: flex;
    gap: 6px;
    align-items: center;
    color: ${theme.color.gray8};
    font-weight: 500;
  }
`;
