import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Typography } from 'antd';
import { FC } from 'react';

import styles from './styles.module.scss';

const SpinIcon = (
  <LoadingOutlined
    style={{ fontSize: 36, color: 'rgba(89, 105, 247, 1)', marginTop: '40px' }}
    spin
  />
);

const { Title } = Typography;

export const LoadingSpinner: FC<{ title?: string }> = ({ title }) => {
  return (
    <div className={styles['loader-wrapper']}>
      {title && (
        <Title level={4} className={styles['loader-wrapper__title']}>
          {title}
        </Title>
      )}
      <Spin indicator={SpinIcon} />
    </div>
  );
};
