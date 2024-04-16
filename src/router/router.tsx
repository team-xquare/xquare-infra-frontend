import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout';
import { Main } from '../pages/Main';
import { Team } from '@/pages/Team';
import { TeamCreate } from '@/pages/Team/Create';
import { Error } from '@/pages/Error';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      {
        path: 'team',
        children: [
          { index: true, element: <Team /> },
          { path: 'create', element: <TeamCreate /> },
        ],
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
