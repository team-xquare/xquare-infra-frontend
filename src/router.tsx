import { createBrowserRouter } from 'react-router-dom';
import { Header } from './components/common/header';
import { Main } from './pages/Main';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [{ path: '', element: <Main /> }],
  },
]);
