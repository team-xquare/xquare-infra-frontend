import { theme } from '@/style/theme';
import { ContainerEnvType, ContainerStatusType } from '@/utils/types/containerType';
import { DeployStatusType } from '@/utils/types/deployType';
import { TeamType } from '@/utils/types/teamType';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TagType = TeamType | 'manage' | ContainerEnvType | DeployStatusType | '오류' | ContainerStatusType;

export const Tag = ({ tag }: { tag: TagType }) => {
  const tagText = (): string => {
    switch (tag) {
      case 'CLUB':
        return '동아리';
      case 'TEAM_PROJECT':
        return '팀 프로젝트';
      case 'PRIVATE_PROJECT':
        return '개인 프로젝트';
      case 'manage':
        return '담당자';
      case 'stag':
        return 'STAG';
      case 'prod':
        return 'PROD';
      case 'AVAILABLE':
      case 'RUNNING':
        return '활성';
      case 'WAIT_FOR_APPROVE':
      case 'PENDING':
        return '대기';
      case 'ERROR':
      case '오류':
        return '오류';
      case 'ETC':
      default:
        return '기타';
    }
  };

  return <Wrapper tag={tag}>{tagText()}</Wrapper>;
};

const Wrapper = styled.div<{ tag: TagType }>`
  padding: 0 10px;
  height: 24px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  color: ${({ tag }) => {
    switch (tag) {
      case 'manage':
      case 'CLUB':
        return `${theme.color.mainDark2} !important`;
      case 'TEAM_PROJECT':
        return `#0C288A !important`;
      case 'PRIVATE_PROJECT':
        return `#876900 !important`;
      case 'prod':
      case 'stag':
        return `${theme.color.gray6}`;
      case 'AVAILABLE':
      case 'RUNNING':
        return `${theme.color.infoDark2}`;
      case 'WAIT_FOR_APPROVE':
      case 'PENDING':
        return `${theme.color.gray6}`;
      case '오류':
      case 'ERROR':
        return `${theme.color.errorDark2}`;
      case 'ETC':
      default:
        return `${theme.color.gray6} !important`;
    }
  }};
  background-color: ${({ tag }) => {
    switch (tag) {
      case 'manage':
      case 'CLUB':
        return `${theme.color.mainLight2} !important`;
      case 'TEAM_PROJECT':
        return `#ECF5FF !important`;
      case 'PRIVATE_PROJECT':
        return `#FFFBDB !important`;
      case 'stag':
      case 'prod':
        return `${theme.color.gray1}`;
      case 'AVAILABLE':
      case 'RUNNING':
        return `${theme.color.infoLight}`;
      case 'WAIT_FOR_APPROVE':
      case 'PENDING':
        return `${theme.color.gray2}`;
      case '오류':
      case 'ERROR':
        return `${theme.color.errorLight}`;
      case 'ETC':
      default:
        return `${theme.color.gray2} !important`;
    }
  }};
  border: ${({ tag }) => {
    switch (tag) {
      case 'prod':
      case 'stag':
        return css`1px solid ${theme.color.gray5}`;
    }
  }};
`;
