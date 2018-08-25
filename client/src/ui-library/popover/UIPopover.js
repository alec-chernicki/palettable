// @flow
import styles from './UIPopover.scss';
import * as React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Manager, Reference, Popper } from 'react-popper';

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

  renderPopover() {
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
          <Popper placement={placement}>
            {({ ref, style, placement, arrowProps }) => {
              return (
                <div ref={ref} style={style} data-placement={placement}>
                  {content}
                  <div ref={arrowProps.ref} className={styles.popperArrow} />
                </div>
              );
            }}
          </Popper>
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.popover}>
        <Manager>
          <Reference>
            {({ ref }) => {
              return <div ref={ref}>{children}</div>;
            }}
          </Reference>
          {this.renderPopover()}
        </Manager>
      </div>
    );
  }
}

export default UIPopover;
