import { IconPropsType } from './IconType';

export const RocketIcon = ({ size = 24, color = 'currentColor' }: IconPropsType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={color}
        d="M8.498 20.005h7.004A6.52 6.52 0 0 1 12 23.507a6.52 6.52 0 0 1-3.502-3.502M18 14.81l2 2.268v1.927H4v-1.927l2-2.268V9.005c0-3.483 2.504-6.447 6-7.545c3.496 1.098 6 4.062 6 7.545zm-6-3.805a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  );
};
