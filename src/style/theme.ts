const color = {
  //main
  main: '#9650FA',
  mainDark1: '#6D1BE0',
  mainDark2: '#420399',
  mainLight1: '#B885FF',
  mainLight2: '#F0E6FF',

  //info
  infoLight: '#D6FFD6',
  infoDark1: '#35BF3B',
  infoDark2: '#096407',

  //gray
  gray1: '#FFFFFF',
  gray2: '#F9F9F9',
  gray3: '#EEEEEE',
  gray4: '#DDDDDD',
  gray5: '#999999',
  gray6: '#555555',
  gray7: '#343434',
  gray8: '#121212',
  gray9: '#000000',

  //error
  errorLight: '#FFD3D3',
  errorDark1: '#C23535',
  errorDark2: '#852424',
} as const;

export const theme = {
  color,
} as const;
