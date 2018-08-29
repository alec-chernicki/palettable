// @flow
import * as React from 'react';
import classNames from 'classnames';
import styles from './UISelectableButton.scss';

type Props = {
  +icon: string,
  +children: React.Node,
  +onClick: () => mixed,
  +className: string,
  +href: string,
  +type: string,
};

class UISelectableButton extends React.Component<Props> {
  renderImage() {
    const { icon } = this.props;
    const IconEl = icon;

    if (!icon) {
      return null;
    }

    return <IconEl size={45} className={styles.icon} />;
  }

  render() {
    const { children, onClick, className, href, type } = this.props;

    return (
      <a
        type={type}
        onClick={onClick}
        className={classNames(styles.selectableButton, className)}
        href={href}
      >
        {this.renderImage()}
        {children}
      </a>
    );
  }
}

export default UISelectableButton;
