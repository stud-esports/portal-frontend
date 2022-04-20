import { FC, ReactElement } from 'react';

import { MainHeader } from '../../components/MainHeader';
import styles from './styles.module.scss';

interface Props {
  children: ReactElement;
}

export const MainLayout: FC<Props> = ({ children }) => (
  <div className={styles['content']}>
    <MainHeader />
    <main className={styles['main-container']}>{children}</main>
  </div>
);
