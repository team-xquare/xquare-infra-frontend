import { RouterProvider } from 'react-router-dom';
import { Router } from './router/router';
import { StyledProvider } from './style/StyledProvider';

export const App = () => {
  console.log(import.meta.env.VITE_SERVER_BASE_URL);

  return (
    <StyledProvider>
      3
      <RouterProvider router={Router} />
    </StyledProvider>
  );
};
