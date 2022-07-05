import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const LoLPage: FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка данных о LoL'} />;
  }

  return (
    <div className={styles['home']}>
      <div style={{ width: '100%' }}>
        <img
          src="/mocks/lol.png"
          alt=""
          style={{ width: '90%', display: 'block', margin: '0 auto' }}
        />
      </div>
    </div>
  );
};
