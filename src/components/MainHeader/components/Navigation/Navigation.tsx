import classNames from 'classnames';
import { FC } from 'react';

import { NavigationLinks } from '../../../../constants/NavigationLinks';
import { NavLink } from './NavLink';
import styles from './styles.module.scss';

interface Props {
  className?: string;
}

export const Navigation: FC<Props> = ({ className }) => {
  return (
    <div className={classNames(styles['navigation-container'], className)}>
      {NavigationLinks.map((item, index) => (
        <NavLink
          key={index}
          className={styles['navigation-container__link']}
          activeClassName={styles['navigation-container__link_active']}
          pathname={item.path}>
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};
