import { RouterProvider } from 'react-router-dom';
import { Router } from './router/router';
import { StyledProvider } from './style/StyledProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 1,
    },
  },
});

export const App = () => {
  console.log(import.meta.env.VITE_SERVER_BASE_URL);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledProvider>
        <RouterProvider router={Router} />
      </StyledProvider>
    </QueryClientProvider>
  );
};
