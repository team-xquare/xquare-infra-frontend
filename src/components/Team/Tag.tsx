import { theme } from '@/style/theme';
import styled from '@emotion/styled';

type TagType = 'club' | 'team' | 'alone' | 'etc';

export const Tag = ({ tag }: { tag: TagType }) => {
  const tagText = (): string => {
    switch (tag) {
      case 'club':
        return '동아리';
      case 'team':
        return '팀 프로젝트';
      case 'alone':
        return '개인 프로젝트';
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
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  color: ${({ tag }) => {
    switch (tag) {
      case 'club':
        return `${theme.color.mainDark2} !important`;
      case 'team':
        return `#0C288A !important`;
      case 'alone':
        return `#876900 !important`;
      default:
        return `${theme.color.gray6} !important`;
    }
  }};
  background-color: ${({ tag }) => {
    switch (tag) {
      case 'club':
        return `${theme.color.mainLight2} !important`;
      case 'team':
        return `#ECF5FF !important`;
      case 'alone':
        return `#FFFBDB !important`;
      default:
        return `${theme.color.gray2} !important`;
    }
  }};
`;
