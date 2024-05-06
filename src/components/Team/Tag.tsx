import { theme } from '@/style/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TagType = 'club' | 'team' | 'alone' | 'etc' | 'manage' | 'PROD' | 'STAG' | '활성' | '대기중' | '오류';

export const Tag = ({ tag }: { tag: TagType }) => {
  const tagText = (): string => {
    switch (tag) {
      case 'club':
        return '동아리';
      case 'team':
        return '팀 프로젝트';
      case 'alone':
        return '개인 프로젝트';
      case 'manage':
        return '담당자';
      case 'STAG':
        return 'STAG';
      case 'PROD':
        return 'PROD';
      case '활성':
        return '활성';
      case '대기중':
        return '대기';
      case '오류':
        return '오류';
      case 'etc':
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
      case 'club':
        return `${theme.color.mainDark2} !important`;
      case 'team':
        return `#0C288A !important`;
      case 'alone':
        return `#876900 !important`;
      case 'PROD':
      case 'STAG':
        return `${theme.color.gray6}`;
      case '활성':
        return `${theme.color.infoDark2}`;
      case '대기중':
        return `${theme.color.gray6}`;
      case '오류':
        return `${theme.color.errorDark2}`;
      case 'etc':
      default:
        return `${theme.color.gray6} !important`;
    }
  }};
  background-color: ${({ tag }) => {
    switch (tag) {
      case 'manage':
      case 'club':
        return `${theme.color.mainLight2} !important`;
      case 'team':
        return `#ECF5FF !important`;
      case 'alone':
        return `#FFFBDB !important`;
      case 'STAG':
      case 'PROD':
        return `${theme.color.gray1}`;
      case '활성':
        return `${theme.color.infoLight}`;
      case '대기중':
        return `${theme.color.gray2}`;
      case '오류':
        return `${theme.color.errorLight}`;
      case 'etc':
      default:
        return `${theme.color.gray2} !important`;
    }
  }};
  border: ${({ tag }) => {
    switch (tag) {
      case 'PROD':
      case 'STAG':
        return css`1px solid ${theme.color.gray5}`;
    }
  }};
`;
