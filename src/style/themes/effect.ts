const effectGenerator = (y: number, blur: number, opacity: number) =>
  `
  box-shadow: 0px ${y}px ${blur}px 0px rgba(0, 0, 0, ${opacity / 100});
`;

export const effect = {
  shadow1: effectGenerator(4, 10, 8),
  shadow2: effectGenerator(1, 15, 10),
  shadow3: effectGenerator(3, 20, 19),
  shadow4: effectGenerator(14, 14, 25),
  shadow5: effectGenerator(19, 19, 30),
} as const;

export type fontKeyOfType = keyof typeof effect;
