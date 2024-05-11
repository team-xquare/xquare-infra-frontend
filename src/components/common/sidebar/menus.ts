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

const team = {
  back: undefined,
  menu: [{ icon: 'ph:circles-four-light', name: '팀', link: '/team' }],
};

const deploy = {
  back: '/team/-team-/manage',
  menu: [
    { icon: 'material-symbols:file-copy-outline', name: '배포', link: '/team/-team-/deploy' },
    { icon: 'f7:shippingbox', name: '컨테이너', link: `/team/-team-/container` },
  ],
};

const deploy_inside = {
  back: '/team/-team-/deploy',
  menu: [
    { icon: 'material-symbols:file-copy-outline', name: '배포 관리', link: '/team/-team-/deploy/-deploy-' },
    { icon: 'f7:shippingbox', name: '컨테이너', link: `/team/-team-/deploy` },
  ],
};

export const menu: MenusType = {
  '/team': team,
  '/team/create': team,
  '/team/:id/manage': {
    back: '/team',
    menu: [
      { icon: 'ph:circles-four-light', name: '팀 관리', link: '/team/-team-/manage' },
      { icon: 'f7:shippingbox', name: '배포', link: `/team/-team-/deploy` },
    ],
  },
  '/team/:id/deploy': deploy,
  '/team/:id/deploy/create': deploy,
  '/team/:id/container': deploy,
  '/team/:id/deploy/:id': deploy_inside,
  '/team/:id/deploy/:id/container': deploy_inside,
  '/team/:id/deploy/:id/container/:id': {
    back: '/team/-team-/deploy/-deploy-/container',
    menu: [
      {
        icon: 'ph:circles-four-light',
        name: '컨테이너 상태',
        link: 'team/-team-/deploy/-deploy-/container/-container-',
      },
      { icon: 'f7:shippingbox', name: '배포 내역', link: `team/-team-/deploy/-deploy-/container/-container-/history` },
      {
        icon: 'f7:shippingbox',
        name: '요청 통계',
        link: `team/-team-/deploy/-deploy-/container/-container-/analytics`,
      },
    ],
  },
};
