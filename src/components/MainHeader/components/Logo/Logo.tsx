import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles['logo-container'], className)}>
      <Image
        src={'/icons/header/ses_logo.svg'}
        layout="fill"
        alt="SeS logo"
        priority
      />
    </div>
  );
};
