import { useEffect, useState } from 'react';

import { debounce } from '../helpers';

type Size = [width: number | undefined, height: number | undefined];

export function useWindowSize(debounceTime = 100): Size {
  const [windowSize, setWindowSize] = useState<Size>([undefined, undefined]);
  useEffect(() => {
    function handleResize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }

    let handleResizeFn = handleResize;

    if (debounceTime) {
      handleResizeFn = debounce(debounceTime, handleResize);
    }

    window.addEventListener('resize', handleResizeFn);
    handleResize();

    return () => window.removeEventListener('resize', handleResizeFn);
  }, []);
  return windowSize;
}
