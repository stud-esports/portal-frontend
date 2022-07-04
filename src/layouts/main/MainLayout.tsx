import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect, useState } from 'react';

import { MainHeader } from '../../components/MainHeader';
import { Loader } from '../../components/PlugScreens/Loader';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { fetchRefreshTokens } from '../../store/reducers/auth/ActionCreators';
import { fetchCurrentUser } from '../../store/reducers/currentUser/ActionCreators';
import { fetchUniversities } from '../../store/reducers/univresities/ActionCreators';
import styles from './styles.module.scss';

interface Props {
  children: ReactElement;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { isFirstRefreshDone, access_token } = useTypedSelector(
    (state) => state.authReducer,
  );
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(fetchUniversities());
    dispatch(fetchRefreshTokens());
  }, []);

  useEffect(() => {
    if (access_token && isFirstRefreshDone) {
      dispatch(fetchCurrentUser());
    }
    if (isFirstRefreshDone && showLoader) {
      setTimeout(() => setShowLoader(false), 1500);
    }
  }, [isFirstRefreshDone]);

  useEffect(() => {
    if (
      access_token &&
      ['/auth/sign-in', '/auth/sign-up'].includes(router.pathname)
    ) {
      router.push('/');
    }
  }, [router.pathname, access_token]);

  return (
    <div className={styles['content']}>
      {showLoader ? (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      ) : (
        <>
          <MainHeader />
          <main className={styles['main-container']}>{children}</main>
        </>
      )}
    </div>
  );
};
