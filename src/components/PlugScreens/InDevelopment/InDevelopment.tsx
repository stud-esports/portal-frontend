import { Result, Typography } from 'antd';
import { FC } from 'react';

import styles from './styles.module.scss';
const { Text } = Typography;

export const InDevelopment: FC = () => {
  return (
    <div className={styles['in-development-wrapper']}>
      <Result
        status="500"
        title={
          <Text className={styles['in-development-wrapper__title']}>
            Страница в разработке
          </Text>
        }
      />
    </div>
  );
};
