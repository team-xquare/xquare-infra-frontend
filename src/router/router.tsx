import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout';
import { Main } from '../pages/Main';
import { Team } from '@/pages/Team';
import { TeamCreate } from '@/pages/Team/Create';
import { Error } from '@/pages/Error';
import { TeamManage } from '@/pages/Team/Manage';
// import { TeamContainer } from '@/pages/Team/Container';
import { TeamDeployInformation } from '@/pages/Team/deploy/Information';
import { TeamDeploy } from '@/pages/Team/deploy';
import { TeamDeployCreate } from '@/pages/Team/deploy/Create';
import { TeamDeployContainer } from '@/pages/Team/deploy/Container';
import { TeamDeployContainerDetail } from '@/pages/Team/deploy/Container/Detail';
import { Login } from '@/pages/Login';
import { SideBarLayout } from './sideBarLayout';
import { TeamDeployContainerTraces } from '@/pages/Team/deploy/Container/Traces';
import { TeamDeployContainerEnv } from '@/pages/Team/deploy/Container/Env';
import { TeamDeployContainerHistory } from '@/pages/Team/deploy/Container/History';
import { TeamDeployContainerHistoryLog } from '@/pages/Team/deploy/Container/HistoryLog';
import { TeamDeployContainerAlert } from '@/pages/Team/deploy/Container/Alert';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      {
        path: 'team',
        element: <SideBarLayout />,
        children: [
          { index: true, element: <Team /> },
          { path: 'create', element: <TeamCreate /> },
          {
            path: ':teamUUID',
            children: [
              { index: true, element: <Error /> },
              { path: 'manage', element: <TeamManage /> },
              // { path: 'container', element: <TeamContainer /> },
              {
                path: 'deploy',
                children: [
                  { index: true, element: <TeamDeploy /> },
                  { path: 'create', element: <TeamDeployCreate /> },
                  {
                    path: ':deployUUID',
                    children: [
                      { index: true, element: <TeamDeployInformation /> },
                      {
                        path: 'container',
                        children: [
                          { index: true, element: <TeamDeployContainer /> },
                          {
                            path: ':env',
                            children: [
                              { index: true, element: <TeamDeployContainerDetail /> },
                              { path: 'traces', element: <TeamDeployContainerTraces /> },
                              { path: 'env', element: <TeamDeployContainerEnv /> },
                              {
                                path: 'history',
                                children: [
                                  { index: true, element: <TeamDeployContainerHistory /> },
                                  {
                                    path: ':pipelineName/:pipelineCounter/:stageName',
                                    element: <TeamDeployContainerHistoryLog />,
                                  },
                                ],
                              },
                              {
                                path: 'alert',
                                element: <TeamDeployContainerAlert />,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
