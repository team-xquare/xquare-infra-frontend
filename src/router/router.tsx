import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout';
import { Main } from '../pages/Main';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <Main /> }],
  },
]);
