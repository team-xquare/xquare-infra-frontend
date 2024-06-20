import { useEffect } from 'react';
import { useNavigationType, NavigationType } from 'react-router-dom';

export const usePathChangeEffect = (callback: () => void) => {
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== NavigationType.Pop) {
      callback();
    }
  }, [callback, navigationType]);
};
