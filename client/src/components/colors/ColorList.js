// @flow
import styles from './ColorList.scss';
import React from 'react';
import { connect } from 'react-redux';
import { MoonLoader } from 'halogen';
import likedColorsSelector from '../../redux/selectors/likedColorsSelector';
import ColorListItem from '../colors/ColorListItem';
import hasFetchFailedSelector from '../../redux/selectors/hasFetchFailedSelector';
import UIButton from '../shared/button/UIButton';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

type Props = {
  +likedColors: Array<Object>,
  +requestPalette: () => mixed,
  +hasFetchFailed: boolean,
};

class ColorList extends React.PureComponent<Props> {
  static defaultProps = {
    likedColors: [],
  };

  renderColors() {
    const { likedColors } = this.props;

    return likedColors.map((color, index) => {
      const isLastItem = likedColors.length - 1 === index;

      return (
        <CSSTransition
          key={color.id}
          className={styles.flexItemWrapper}
          timeout={400}
          classNames={{
            enter: styles.flexEnter,
            enterActive: styles.flexEnterActive,
            exit: styles.flexExit,
            exitActive: styles.flexExitActive,
          }}
        >
          <div>
            <ColorListItem color={color} isLastItem={isLastItem} />
          </div>
        </CSSTransition>
      );
    });
  }

  render() {
    const { likedColors, hasFetchFailed } = this.props;

    if (hasFetchFailed) {
      return (
        <div className={styles.loaderContainer}>
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

    if (!likedColors.length) {
      return (
        <div className={styles.loaderContainer}>
          <div className={styles.loader} key="loader">
            <MoonLoader color="#FFF" />
          </div>
        </div>
      );
    }

    return (
      <TransitionGroup className={styles.colorList}>
        {this.renderColors()}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    likedColors: likedColorsSelector(state),
    hasFetchFailed: hasFetchFailedSelector(state),
  };
};

export default connect(mapStateToProps)(ColorList);
