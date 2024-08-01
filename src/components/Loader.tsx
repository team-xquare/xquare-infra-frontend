/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

const animloader = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const loaderStyle = css`
  width: 24px;
  height: 24px;
  display: inline-block;
  position: relative;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #dcab07;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${animloader} 2s linear infinite;
  }

  &::after {
    animation-delay: 1s;
  }
`;

export const Loader: React.FC = () => {
  return <div css={loaderStyle}></div>;
};
