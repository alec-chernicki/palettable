// @flow
import styles from './ColorItem.scss';
import React from 'react';
import ColorName from '../color/ColorName';
import ColorItemFooter from '../color/ColorItemFooter';
import ColorPickerTool from '../color/ColorPickerTool';
import RemoveColorTool from '../color/tools/RemoveColorTool';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import type { ColorType } from '../../constants/FlowTypes';

type Props = {
  color: ColorType,
  isFetching: boolean,
  isLastItem: boolean,
};

class ColorItem extends React.PureComponent<Props> {
  renderLoader() {
    return (
      <CSSTransition
        key="loader"
        timeout={400}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
      >
        <div className={styles.loaderContainer} />
      </CSSTransition>
    );
  }
  renderTools() {
    const { color } = this.props;
    return (
      <CSSTransition
        key="tools"
        timeout={200}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
      >
        <div>
          <ColorName color={color} />
          <div className={styles.toolIcons}>
            <ColorPickerTool color={color} />
            <RemoveColorTool color={color} />
          </div>
        </div>
      </CSSTransition>
    );
  }

  renderContent() {
    const { isFetching, isLastItem } = this.props;

    if (isFetching && isLastItem) {
      return this.renderLoader();
    }

    return this.renderTools();
  }

  render() {
    const { color, isLastItem } = this.props;

    const style = {
      backgroundColor: color.hexCode,
    };

    return (
      <li style={style} className={styles.colorItem}>
        <TransitionGroup>{this.renderTools()}</TransitionGroup>
        <ColorItemFooter color={color} />
      </li>
    );
  }
}

export default ColorItem;
