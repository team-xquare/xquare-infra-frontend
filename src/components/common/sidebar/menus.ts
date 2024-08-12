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
  back: '/team',
  menu: [
    { icon: 'ph:circles-four-light', name: '팀 관리', link: '/team/-team-/manage' },
    { icon: 'f7:shippingbox', name: '배포', link: `/team/-team-/deploy` },
  ],
};

const deploy_inside = {
  back: '/team/-team-/deploy',
  menu: [
    { icon: 'material-symbols:file-copy-outline', name: '배포 관리', link: '/team/-team-/deploy/-deploy-' },
    { icon: 'f7:shippingbox', name: '컨테이너', link: `/team/-team-/deploy/-deploy-/container` },
  ],
};

const container_inside = {
  back: '/team/-team-/deploy/-deploy-/container',
  menu: [
    {
      icon: 'f7:shippingbox',
      name: '컨테이너 상태',
      link: '/team/-team-/deploy/-deploy-/container/-env-',
    },
    {
      icon: 'ph:list-bold',
      name: '배포 내역',
      link: `/team/-team-/deploy/-deploy-/container/-env-/history`,
    },
    {
      icon: 'ic:outline-cloud',
      name: 'Traces',
      link: `/team/-team-/deploy/-deploy-/container/-env-/traces`,
    },
    {
      icon: 'uil:setting',
      name: '환경변수',
      link: `/team/-team-/deploy/-deploy-/container/-env-/env`,
    },
    {
      icon: 'ri:notification-line',
      name: 'Alert',
      link: '/team/-team-/deploy/-deploy-/container/-env-/alert',
    },
  ],
};

const history = {
  back: '/team/-team-/deploy/-deploy-/container/-env-',
  menu: [],
};

export const menu: MenusType = {
  '/team': team,
  '/team/create': team,
  '/team/:id/manage': deploy,
  '/team/:id/deploy': deploy,
  '/team/:id/deploy/create': deploy,
  // '/team/:id/container': deploy,
  '/team/:id/deploy/:id': deploy_inside,
  '/team/:id/deploy/:id/container': deploy_inside,
  '/team/:id/deploy/:id/container/:env': container_inside,
  '/team/:id/deploy/:id/container/:env/traces': container_inside,
  '/team/:id/deploy/:id/container/:env/env': container_inside,
  '/team/:id/deploy/:id/container/:env/history': container_inside,
  '/team/:id/deploy/:id/container/:env/alert': container_inside,
  '/team/:id/deploy/:id/container/:env/alertActive': container_inside,
  '/team/:id/deploy/:id/container/:env/history/:id/:pipelineCounter/build': history,
  '/team/:id/deploy/:id/container/:env/history/:id/:pipelineCounter/deploy': history,
  // '/team/:id/deploy/:id/container/:env/history/build-xquare-infra-prod/57/build'
};
