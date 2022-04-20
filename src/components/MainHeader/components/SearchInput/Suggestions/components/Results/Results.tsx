import { Empty, Typography } from 'antd';
import { FC } from 'react';

import styles from './styles.module.scss';
const { Text } = Typography;
export const Results: FC = () => {
  return (
    <div className={styles['results-container']}>
      <Empty
        className={styles['empty-block']}
        description={
          <Text className={styles['empty-block__description']}>Нет данных</Text>
        }
      />
    </div>
  );
};
