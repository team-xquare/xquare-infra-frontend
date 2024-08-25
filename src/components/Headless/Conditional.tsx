import React, { ReactElement } from 'react';
import { IChildren } from '@/utils/types/components/children';

interface ConditionalProps<T> {
  data: T;
  isLoading: boolean;
  emptyFunction: (data: T) => boolean;
  renderComponent: ReactElement;
  loadingComponent: ReactElement;
  emptyComponent: ReactElement;
}

export const Conditional = () => {
  const Wrapper = <T,>({
    data,
    isLoading,
    emptyFunction,
    renderComponent,
    loadingComponent,
    emptyComponent,
  }: ConditionalProps<T>) => {
    if (isLoading) {
      return loadingComponent;
    }

    if (emptyFunction(data)) {
      return emptyComponent;
    }

    return renderComponent;
  };

  const Render: React.FC<IChildren> = ({ children }) => {
    return <>{children}</>;
  };

  const Loading: React.FC<IChildren> = ({ children }) => {
    return <>{children}</>;
  };

  const Empty: React.FC<IChildren> = ({ children }) => {
    return <>{children}</>;
  };

  return { Wrapper, Render, Loading, Empty };
};
