import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const GamesListPage: FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка списка игр'} />;
  }

  return (
    <div className={styles['home']}>
      <div style={{ width: '100%' }}>
        <img
          onClick={() => router.push('/games/lol')}
          src="/mocks/games-list.png"
          alt=""
          style={{ width: '90%', display: 'block', margin: '0 auto' }}
        />
      </div>
    </div>
  );
};
