import classNames from 'classnames';
import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  suggestionsCount: number;
  className?: string;
}

export const Counter: FC<Props> = ({ suggestionsCount, className }) => {
  return (
    <span className={classNames(styles['counter'], className)}>
      {suggestionsCount}
    </span>
  );
};
