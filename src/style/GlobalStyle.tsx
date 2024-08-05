import { Global, css } from '@emotion/react';

const style = css`
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles&family=JetBrains+Mono:wght@500&display=swap')
      format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'JetBrains Mono';
    src: url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles&family=JetBrains+Mono:wght@600&display=swap')
      format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Black.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Thin.woff') format('woff');
  }

  * {
    margin: 0;
    padding: 0;
    outline: unset;
    box-sizing: border-box;
    border: 0;
    list-style: none;
    font-style: normal;
    font-family: 'Pretendard', sans-serif;
    text-decoration: none;
  }

  body {
    overflow-x: hidden;
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};
