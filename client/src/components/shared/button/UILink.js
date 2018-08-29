// @flow
import * as React from 'react';
import CSSModules from 'react-css-modules';
import styles from './UILink.css';

type Props = {
  children: React.Node,
  onClick: () => mixed,
};

class UILink extends React.Component<Props> {
  render() {
    const { children, onClick } = this.props;

    return (
      <a onClick={onClick} styleName="uiLink">
        {children}
      </a>
    );
  }
}

export default CSSModules(UILink, styles);
