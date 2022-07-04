import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntdAvatar, Button, Popover, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { fetchLogout } from '../../../../store/reducers/auth/ActionCreators';
import styles from './styles.module.scss';

const { Text } = Typography;

const PopupContent: FC<{ hide: any }> = ({ hide }) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { currentUser } = useTypedSelector((state) => state.userReducer);
  const { universities } = useTypedSelector(
    (state) => state.universitiesReducer,
  );

  const onLogout = () => {
    dispatch(fetchLogout());
    hide();
    setTimeout(() => router.reload(), 300);
  };

  const getRole = () => {
    const roles = currentUser?.roles.map((item) => item.name) || [];
    if (roles.includes('admin')) {
      return (
        <Text className={styles['popup-content__item']}>Администратор</Text>
      );
    }
    if (roles.includes('moderator')) {
      if (currentUser?.moderated_university_id) {
        const university = universities.find(
          (item) => item._id === currentUser?.moderated_university_id,
        );
        return (
          <>
            <Text>Модератор от</Text>
            <Link href={'/universities/' + university!._id}>
              <a className={styles['popup-content__item']}>
                {university!.short_name}
              </a>
            </Link>
          </>
        );
      }
      return <Text className={styles['popup-content__item']}>Модератор</Text>;
    }

    return <Text className={styles['popup-content__item']}>Пользователь</Text>;
  };

  if (!currentUser) {
    return (
      <div>
        <Button type="default" onClick={() => router.push('/auth/sign-in')}>
          Войти
        </Button>
      </div>
    );
  }

  return (
    <div className={styles['popup-content']}>
      <Link href={'/users/' + currentUser._id}>
        <a className={styles['popup-content__item']}>В профиль</a>
      </Link>
      {getRole()}
      <Button
        style={{ width: '50%', marginTop: '10px' }}
        type="default"
        onClick={() => onLogout()}>
        Выйти
      </Button>
    </div>
  );
};

export const Avatar: FC = () => {
  const { currentUser } = useTypedSelector((state) => state.userReducer);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setVisible(false);
  }, [router.pathname]);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <Popover
      content={<PopupContent hide={() => setVisible(false)} />}
      title={
        currentUser ? (
          <Text>{`${currentUser.last_name} ${currentUser.first_name[0]}.`}</Text>
        ) : (
          <Text>Не авторизован</Text>
        )
      }
      placement="bottomRight"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}>
      <AntdAvatar
        icon={<UserOutlined className={styles['avatar__icon']} />}
        className={classNames(
          styles['avatar'],
          currentUser ? styles['avatar_auth'] : null,
        )}
      />
    </Popover>
  );
};
