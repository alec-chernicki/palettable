// @flow
import styles from './ColorList.css';
import React from 'react';
import { MoonLoader } from 'halogen';
import ColorItem from '../../components/ColorItem/ColorItem';
import getInterfaceAttributes from '../../utils/getInterfaceAttributes';
import UIButton from '../../UILibrary/button/UIButton';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

type Props = {
  +likedColors: Array<Object>,
  +requestPalette: () => mixed,
  +styles: Object,
  +hasFetchFailed: boolean,
};

class ColorList extends React.Component<Props> {
  static defaultProps = {
    likedColors: [],
  };

  renderError() {
    return (
      <div styleName="loader-container">
        <div>
          <h1>Well, this is embarassing.</h1>
          <p>Unfortunately we weren't able to get suggested palettes.</p>
          <UIButton use="positive" href="/">
            Refresh the page
          </UIButton>
        </div>
      </div>
    );
  }

  renderColors() {
    const { likedColors } = this.props;
    return likedColors.map((color, index) => {
      const isLastItem = likedColors.length - 1 === index;
      return (
        <CSSTransition
          key={color.id}
          className={styles['flex-item-wrapper']}
          timeout={400}
          classNames={{
            enter: styles['flex-enter'],
            enterActive: styles['flex-enter-active'],
            exit: styles['flex-exit'],
            exitActive: styles['flex-exit-active'],
          }}
        >
          <div>
            <ColorItem color={color} isLastItem={isLastItem} />
          </div>
        </CSSTransition>
      );
    });
  }

  renderList() {
    const { styles } = this.props;
    return (
      <TransitionGroup className={styles['color-list']}>
        {this.renderColors()}
      </TransitionGroup>
    );
  }

  renderLoader() {
    const interfaceAttributes = getInterfaceAttributes('#222');
    return (
      <div styleName="loader-container">
        <div styleName="loader" key="loader">
          <MoonLoader color={interfaceAttributes.color} />
        </div>
      </div>
    );
  }

  render() {
    const { likedColors, hasFetchFailed } = this.props;
    if (hasFetchFailed) {
      return this.renderError();
    }
    if (!likedColors.length) {
      return this.renderLoader();
    }
    return this.renderList();
  }
}

export default ColorList;
