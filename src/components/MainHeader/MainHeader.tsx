import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, PageHeader } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useScrollData } from 'scroll-data-hook';

import { Appear } from '../../animations';
import { Logo, Navigation, SearchInput } from './components';
import styles from './styles.module.scss';

export const MainHeader: FC = () => {
  const [showBackground, setShowBackground] = useState(false);
  const { position } = useScrollData();

  return (
    <>
      <Appear show={showBackground}>
        <div className={styles['header-background']} />
      </Appear>

      <PageHeader
        className={classNames(
          styles['page-header'],
          position.y > 0 ? styles['page-header_bg-dark'] : null,
        )}
        title={<Logo className={styles['page-header__logo']} />}
        subTitle={
          <SearchInput
            className={classNames(
              styles['page-header__search-input'],
              styles['mobile-hidden'],
            )}
            handleBackground={setShowBackground}
          />
        }
        onBack={() => null}
        backIcon={<MenuOutlined className={styles['page-header__menu-icon']} />}
        extra={[
          <Navigation key="0" className={styles['mobile-hidden']} />,

          <Avatar
            key="1"
            icon={<UserOutlined />}
            className={styles['page-header__avatar']}
          />,
        ]}
      />
    </>
  );
};
