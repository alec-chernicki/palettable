// @flow
import * as React from 'react';
import keyMirror from 'keymirror';
import styles from './UIButton.scss';
import classNames from 'classnames';

const useProps = keyMirror({
  primary: null,
  positive: null,
  negative: null,
});

type Props = {
  +children: React.Node,
  +onClick: () => mixed,
  +className: string,
  +use: 'primary' | 'positive' | 'negative',
  +href: string,
  +style: Object,
};

class UIButton extends React.Component<Props> {
  static defaultProps = {
    use: useProps.primary,
  };

  render() {
    const { children, onClick, className, use, href, style } = this.props;
    const componentClass = classNames(className, {
      [styles.primary]: use === useProps.primary,
      [styles.positive]: use === useProps.positive,
      [styles.negative]: use === useProps.negative,
    });

    return (
      <a
        style={style}
        onClick={onClick}
        className={classNames(className, componentClass)}
        href={href}
      >
        {children}
      </a>
    );
  }
}

export default UIButton;
