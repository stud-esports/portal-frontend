import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, MouseEvent, ReactNode } from 'react';

interface Props {
  className?: string;
  activeClassName?: string;
  pathname: string;
  children: ReactNode;
  prefetch?: boolean;
}

export const NavLink: FC<Props> = (props) => {
  const {
    children,
    className,
    activeClassName,
    pathname,
    prefetch = false,
  } = props;
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (router.pathname !== pathname) {
      router.push(pathname);
    }
  };

  return (
    <Link href={pathname} prefetch={prefetch}>
      <a
        onClick={handleClick}
        className={classNames(
          className,
          router.pathname === pathname ? activeClassName : null,
        )}>
        {children}
      </a>
    </Link>
  );
};
