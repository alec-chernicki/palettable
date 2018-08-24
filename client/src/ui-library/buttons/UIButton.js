// @flow
import * as React from 'react';
import keyMirror from 'keymirror';
import styles from './UIButton.scss';
import classNames from 'classnames';
import { Link } from 'react-router';

const LinkOriginal = props => <a {...props} />;
const LinkWithRouter = props => <Link {...props} />;

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
  +to: string,
  +style: Object,
};

class UIButton extends React.Component<Props> {
  static defaultProps = {
    use: useProps.primary,
  };

  render() {
    const { children, onClick, className, use, href, to, style } = this.props;
    const componentClass = classNames({
      [styles.primary]: use === useProps.primary,
      [styles.positive]: use === useProps.positive,
      [styles.negative]: use === useProps.negative,
    });

    const ComponentToRender = to ? LinkWithRouter : LinkOriginal;

    return (
      <ComponentToRender
        style={style}
        onClick={onClick}
        styleName={componentClass}
        className={className}
        href={href}
        to={to}
      >
        {children}
      </ComponentToRender>
    );
  }
}

export default UIButton;
