import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, PageHeader, Popover, Typography } from 'antd';
import Link from 'next/link';
import { FC, useState } from 'react';

import styles from './styles.module.scss';

const { Text } = Typography;

const Menu: FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('log out fetch');
        }}>
        Выйти
      </Button>
    </div>
  );
};

export const MainHeader: FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handleVisibleChange = (visible: boolean) => {
    setShowPopover(visible);
  };

  return (
    <PageHeader
      className={styles['page-header']}
      title={<Text className={styles['page-header__title']}>Stud Esports</Text>}
      backIcon={false}
      extra={[
        <Link href="/" key="0">
          <a className={styles['page-header__link']}>Главная</a>
        </Link>,
        <Link href="/forum" key="1">
          <a className={styles['page-header__link']}>Форум</a>
        </Link>,
        <Text key="2" className={styles['page-header__user-name']}>
          Пользователь
        </Text>,

        <Popover
          key="3"
          content={Menu}
          title={<Text strong>Инфо</Text>}
          placement="bottom"
          trigger="click"
          visible={showPopover}
          onVisibleChange={handleVisibleChange}>
          <Avatar
            icon={<UserOutlined />}
            className={styles['page-header__avatar']}
          />
        </Popover>,
      ]}
    />
  );
};
