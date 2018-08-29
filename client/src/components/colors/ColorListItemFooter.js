// @flow
import styles from "./ColorListItemFooter.scss";
import type { ColorType } from "../../constants/FlowTypes";
import React from "react";
import classNames from "classnames";
import UIButton from "../shared/button/UIButton";
import { connect } from "react-redux";
import { dislikeColor } from "../../redux/actions/dislikedColors";
import { likeColor } from "../../redux/actions/likedColors";
import likedColorsSelector from "../../redux/selectors/likedColorsSelector";
import ExportButton from "../export/ExportButton";

type Props = {
  +isAtMaximum: boolean,
  +onLike: () => {},
  +onDislike: () => {},
  +color: ColorType,
  +isLastItem: boolean,
  +isAtMaximum: boolean,
  +active: boolean
};

class ColorListItemFooter extends React.Component<Props> {
  static defaultProps = {
    isLastItem: false,
    isAtMaximum: false
  };

  renderLikeButton() {
    const { onLike } = this.props;

    return (
      <UIButton use="positive" onClick={onLike}>
        Like
      </UIButton>
    );
  }

  renderDislikeButton() {
    const { onDislike } = this.props;

    return (
      <UIButton
        use="negative"
        className={styles.buttonDislike}
        onClick={onDislike}
      >
        Dislike
      </UIButton>
    );
  }

  render() {
    const { active, isAtMaximum } = this.props;
    const classNameProp = classNames(styles.colorFooter, {
      [styles.active]: active,
      [styles.inactive]: !active
    });

    return (
      <div className={classNameProp}>
        {isAtMaximum && <p className={styles.message}>Maximum of 5 colors</p>}
        <div className={styles.buttons}>
          {this.renderDislikeButton()}
          {isAtMaximum ? <ExportButton /> : this.renderLikeButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAtMaximum: likedColorsSelector(state).length >= 5
});

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    onLike: () => dispatch(likeColor(color)),
    onDislike: () => dispatch(dislikeColor(color))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorListItemFooter);
