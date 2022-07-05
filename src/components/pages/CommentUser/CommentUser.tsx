import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './styles.module.scss';

const { Text } = Typography;

export const CommentUserPage: FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 500);
  }, []);

  if (showLoader) {
    return <LoadingSpinner title={'Загрузка пользователя'} />;
  }

  return (
    <div className={styles['home']}>
      <div style={{ width: '100%' }}>
        <img
          onClick={() => router.push('/teams/progafute')}
          src="/mocks/comment-user.png"
          alt=""
          style={{ width: '80%', display: 'block', margin: '0 auto' }}
        />
      </div>
    </div>
  );
};
