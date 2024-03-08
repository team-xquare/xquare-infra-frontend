import { createBrowserRouter } from 'react-router-dom';
import { Main } from './pages/Main';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);
