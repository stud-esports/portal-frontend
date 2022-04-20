import { FC, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  show: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

export const Appear: FC<Props> = (props) => {
  const { children, show, onEnter, onExited } = props;
  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        // appear: 'my-appear',
        // appearActive: 'my-active-appear',
        // appearDone: 'my-done-appear',
        // enter: 'my-enter',
        enterActive: styles['block-show-active'],
        // enterDone: 'my-done-enter',
        // exit: 'my-exit',
        exitActive: styles['block-hide-active'],
        // exitDone: 'my-done-exit',
      }}
      mountOnEnter
      unmountOnExit
      onEnter={onEnter}
      onExited={onExited}>
      {children}
    </CSSTransition>
  );
};
