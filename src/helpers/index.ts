import { serialize } from 'cookie';

export const debounce = (delay: number, fn: any) => {
  let timerId: any;

  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export const getSerializedRefreshTokenCookie = (token: string) => {
  return serialize('refresh_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 10,
    path: '/',
    sameSite: 'strict',
  });
};

export const getSerializedDeleteTokenCookie = () => {
  return serialize('refresh_token', 'delete', {
    httpOnly: true,
    maxAge: -1,
    path: '/',
    sameSite: 'strict',
  });
};
