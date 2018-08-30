// @flow
import styles from './ColorSelectionFooter.scss';
import type { ColorType } from '../../constants/FlowTypes';
import React from 'react';
import classNames from 'classnames';
import UIButton from '../shared/button/UIButton';
import { connect } from 'react-redux';
import { dislikeColor } from '../../redux/actions/dislikedColors';
import { likeColor } from '../../redux/actions/likedColors';
import likedColorsSelector from '../../redux/selectors/likedColorsSelector';
import ExportButton from '../export/ExportButton';

type Props = {
  +isAtMaximum: boolean,
  +dispatchLikeColor: () => {},
  +dispatchDislikeColor: () => {},
  +color: ColorType,
  +active: boolean,
};

export class ColorSelectionFooter extends React.Component<Props> {
  static defaultProps = {
    active: false,
    isAtMaximum: false,
  };

  renderLikeButton() {
    const { dispatchLikeColor } = this.props;

    return (
      <UIButton
        data-jest="likeButton"
        use="positive"
        onClick={dispatchLikeColor}
      >
        Like
      </UIButton>
    );
  }

  renderDislikeButton() {
    const { dispatchDislikeColor } = this.props;

    return (
      <UIButton
        data-jest="dislikeButton"
        use="negative"
        className={styles.buttonDislike}
        onClick={dispatchDislikeColor}
      >
        Dislike
      </UIButton>
    );
  }

  render() {
    const { active, isAtMaximum } = this.props;
    const classNameProp = classNames(styles.colorFooter, {
      [styles.active]: active,
      [styles.inactive]: !active,
    });

    return (
      <div className={classNameProp}>
        {isAtMaximum && <p className={styles.message}>Maximum of 5 colors</p>}
        <div className={styles.buttons}>
          {this.renderDislikeButton()}
          {isAtMaximum ? (
            <ExportButton data-jest="exportButton" />
          ) : (
            this.renderLikeButton()
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAtMaximum: likedColorsSelector(state).length >= 5,
});

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    dispatchLikeColor: () => dispatch(likeColor(color)),
    dispatchDislikeColor: () => dispatch(dislikeColor(color)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorSelectionFooter);
