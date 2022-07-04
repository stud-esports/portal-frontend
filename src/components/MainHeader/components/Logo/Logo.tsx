import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
  const router = useRouter();
  return (
    <div
      className={classNames(styles['logo-container'], className)}
      onClick={() => router.push('/')}>
      <Image
        src={'/icons/header/ses_logo.svg'}
        layout="fill"
        alt="SeS logo"
        priority
      />
    </div>
  );
};
