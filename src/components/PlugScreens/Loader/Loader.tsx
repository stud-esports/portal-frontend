import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';
import { FC } from 'react';

import styles from './styles.module.scss';

const SpinIcon = (
  <LoadingOutlined
    style={{ fontSize: 48, color: 'rgba(89, 105, 247, 1)', marginTop: '40px' }}
    spin
  />
);

export const Loader: FC = () => {
  return (
    <div className={styles['loader-wrapper']}>
      <Image
        className={styles['loader-wrapper__logo']}
        src={'/icons/header/ses_logo.svg'}
        layout="fixed"
        width="250px"
        height="80px"
        alt="SeS logo"
        priority
      />
      <Spin indicator={SpinIcon} />
    </div>
  );
};
