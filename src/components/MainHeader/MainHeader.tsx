import { MenuOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { Appear } from '../../animations';
import { Logo, Navigation, SearchInput } from './components';
import { Avatar } from './components/Avatar';
import styles from './styles.module.scss';

export const MainHeader: FC = () => {
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();
  const [showAvatar, setShowAvatar] = useState(true);

  useEffect(() => {
    setShowAvatar(
      !['/auth/sign-in', '/auth/sign-up'].includes(router.pathname),
    );
  }, [router.pathname]);

  return (
    <>
      <Appear show={showBackground}>
        <div className={styles['header-background']} />
      </Appear>

      <PageHeader
        className={classNames(styles['page-header'])}
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
          showAvatar && <Avatar key="1" />,
        ]}
      />
    </>
  );
};
