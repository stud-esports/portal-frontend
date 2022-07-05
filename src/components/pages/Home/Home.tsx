import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const HomePage: FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка новостей'} />;
  }

  return (
    <div className={styles['home']}>
      <div className={styles['home__search']}>
        <Text className={styles['search__title']}>Новости и статьи</Text>
        <div className={styles['search__filters']}>
          <div className={styles['filter']}>
            Фильтр <FilterOutlined style={{ color: 'white' }} />
          </div>
          <div className={styles['filter']}>
            Сортировка <CaretDownOutlined style={{ color: 'white' }} />
          </div>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <img
          onClick={() => router.push('/news/cyberpunk-bugs')}
          src="/mocks/news_list.png"
          alt=""
          style={{ width: '100%', display: 'block', margin: '0 auto' }}
        />
      </div>
    </div>
  );
};
