import { theme } from '@/style/theme';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  & ::-webkit-scrollbar {
    width: 4px;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
  }
`;

export const TopContainer = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 34px;
  > div:first-of-type {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const MiddleContainer = styled.div`
  width: 480px;
  height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MemberBox = styled.div`
  width: 100%;
  height: 60px;
  flex: none;
  border-radius: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.color.gray4};
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;
  width: 480px;
  > div:first-child {
    font-size: 18px;
    font-weight: 500;
  }
`;
