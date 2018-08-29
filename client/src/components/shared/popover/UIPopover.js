// @flow
import styles from './UIPopover.scss';
import * as React from 'react';
import { Manager, Target, Popper, Arrow } from 'react-popper';
import CSSTransition from 'react-transition-group/CSSTransition';

type Props = {
  +isOpen: boolean,
  +placement: 'top' | 'bottom' | 'left' | 'right',
  +children: React.Node,
  +content: React.Node,
};

class UIPopover extends React.Component<Props> {
  static defaultProps = {
    isOpen: false,
    placement: 'top',
  };

  renderContent() {
    const { placement, content, isOpen } = this.props;

    return (
      <CSSTransition
        in={isOpen}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={200}
        classNames={{
          enter: styles.popoverEnter,
          enterActive: styles.popoverEnterActive,
          exit: styles.popoverExit,
          exitActive: styles.popoverExitActive,
        }}
      >
        <div className={styles.popperAnimationWrapper}>
          <Popper placement={placement} className={styles.popper}>
            {content}
            <Arrow className={styles.popperArrow} />
          </Popper>
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <Manager>
        <Target>{children}</Target>
        {this.renderContent()}
      </Manager>
    );
  }
}

export default UIPopover;
