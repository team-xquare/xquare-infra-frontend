import { RouterProvider } from 'react-router-dom';
import { Router } from './router/router';
import { StyledProvider } from './style/StyledProvider';

export const App = () => {
  return (
    <StyledProvider>
      <RouterProvider router={Router} />
    </StyledProvider>
  );
};
