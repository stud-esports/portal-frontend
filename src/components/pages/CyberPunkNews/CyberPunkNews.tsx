import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const CyberPunkNewsPage: FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка новости'} />;
  }

  return (
    <div className={styles['home']}>
      <div style={{ width: '100%' }}>
        <img
          src="/mocks/cyberpunk-news.png"
          alt=""
          style={{ width: '70%', display: 'block', margin: '0 auto' }}
        />
        <img
          onClick={() => router.push('/users/losh')}
          src="/mocks/cyberpunk-comments.png"
          alt=""
          style={{ width: '70%', display: 'block', margin: '0 auto' }}
        />
        {/*<Image*/}
        {/*  className={styles['loader-wrapper__logo']}*/}
        {/*  src={'/mocks/news_list.png'}*/}
        {/*  layout="intrinsic"*/}
        {/*  alt="SeS logo"*/}
        {/*  priority*/}
        {/*/>*/}
      </div>
    </div>
  );
};
