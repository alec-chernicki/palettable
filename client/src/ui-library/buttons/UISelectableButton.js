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
  +styles: Object,
  +type: string,
};

const UISelectableButton = ({ children, onClick, className, icon }: Props) => {
  const IconEl = icon;

  return (
    <a
      onClick={onClick}
      className={classNames(className, styles.selectableButton)}
    >
      {icon && <IconEl size={45} className={styles.icon} />}
      {children}
    </a>
  );
};

UISelectableButton.defaultProps = {
  onClick: () => {},
};

export default UISelectableButton;
