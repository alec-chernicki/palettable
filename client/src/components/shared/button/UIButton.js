// @flow
import * as React from 'react';
import styles from './UIButton.scss';
import classNames from 'classnames';

const useProps = {
  primary: 'primary',
  positive: 'positive',
  negative: 'negative',
};

type Props = {
  +children: React.Node,
  +onClick: () => mixed,
  +className: string,
  +use: 'primary' | 'positive' | 'negative',
  +href: string,
  +to: string,
};

class UIButton extends React.Component<Props> {
  static defaultProps = {
    use: useProps.primary,
  };

  render() {
    const { children, onClick, use, href, to, className, style } = this.props;
    const classNameProp = classNames(styles.button, className, {
      [styles.primary]: use === useProps.primary,
      [styles.positive]: use === useProps.positive,
      [styles.negative]: use === useProps.negative,
    });

    return (
      <a
        style={style}
        className={classNameProp}
        onClick={onClick}
        href={href}
        to={to}
      >
        {children}
      </a>
    );
  }
}

export default UIButton;
