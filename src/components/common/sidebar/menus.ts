type MenuType = {
  icon: string;
  name: string;
  link: string;
};

type MenusType = {
  [key: string]: {
    back: undefined | string;
    menu: MenuType[];
  };
};

export const menu: MenusType = {
  '/team': {
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀', link: '/team' },
      { icon: 'icon-park-outline:people', name: '계정', link: '' },
    ],
  },
  '/team/create': {
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀', link: '/team' },
      { icon: 'icon-park-outline:people', name: '계정', link: '' },
    ],
  },
  '/team/:id/manage': {
    back: undefined,
    menu: [
      { icon: 'ph:circles-four-light', name: '팀 관리', link: '' },
      { icon: 'icon-park-outline:people', name: '배포', link: `/team/-team-/deploy` },
    ],
  },
  '/team/:id/deploy': {
    back: '/team/-team/manage',
    menu: [
      { icon: 'ph:circles-four-light', name: '팀 관리', link: '' },
      { icon: 'icon-park-outline:people', name: '배포', link: `/team/-team-/deploy` },
    ],
  },
};
