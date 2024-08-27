import { useState, useRef, useEffect, useCallback } from 'react';

export const useResizable = (initialWidth: number, minWidth: number, maxWidth: number) => {
  const [width, setWidth] = useState<number>(initialWidth);
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && boxRef.current) {
        const newWidth = window.innerWidth - e.clientX;
        setWidth(Math.min(Math.max(minWidth, newWidth), maxWidth));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth]);

  return { width, boxRef, handleMouseDown };
};
