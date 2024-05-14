import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';

export type useModalReturnType = {
  isVisible: string | boolean;
  onShow: (arg?: string | undefined) => void;
  onClose: () => void;
  ModalWrapper: ({
    width,
    height,
    children,
  }: {
    width: number | string;
    height: number | string;
    children: React.ReactNode;
  }) => JSX.Element;
};

export type useModalProps = {
  defaultVisible?: string | boolean;
};

export const useModal = ({ defaultVisible = false }: useModalProps = {}): useModalReturnType => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const onShow = useCallback((arg?: string) => {
    setIsVisible(arg || true);
  }, []);

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const ModalWrapper = useCallback(
    ({
      width,
      height,
      children,
    }: {
      width: number | string;
      height: number | string;
      children: React.ReactNode;
    }): JSX.Element => {
      const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

      return (
        <ModalBackground onClick={onClick}>
          <Wrapper width={width} height={height}>
            {children}
          </Wrapper>
        </ModalBackground>
      );
    },
    [onClose],
  );

  return {
    isVisible,
    onShow,
    onClose,
    ModalWrapper,
  };
};

const ModalBackground = styled.div`
  width: 100vw;
  height: calc(100vh + 52px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div<{ width: number | string; height: number | string }>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : `${width}`)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : `${height}`)};
  background-color: ${theme.color.gray1};
  border-radius: 8px;
  ${theme.effect.shadow3};
`;
