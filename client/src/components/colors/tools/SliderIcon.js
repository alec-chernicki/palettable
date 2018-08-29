// @flow
import React from 'react';
import styles from './SliderIcon.scss';
import classNames from 'classnames';
import Color from 'color';

type Props = {
  onClick: () => mixed,
  hexCode: string,
};

type State = {
  active: boolean,
};

class SliderIcon extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  handleMouseEnter = e => {
    this.setState({ active: true });
  };

  handleMouseLeave = e => {
    this.setState({ active: false });
  };

  render() {
    const { onClick, hexCode } = this.props;
    const { active } = this.state;
    const classNameProp = classNames(styles.sliderIcon, {
      [styles.active]: active,
      [styles.inactive]: !active,
    });
    const isDark = Color(hexCode).dark();
    const colorClassName = isDark ? styles.light : styles.dark;

    return (
      <div
        onClick={onClick}
        className={classNameProp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={classNames(styles.item, colorClassName)}>
          <div className={styles.itemLine} />
          <div className={styles.itemCircle} />
        </div>
        <div className={classNames(styles.item, colorClassName)}>
          <div className={styles.itemLine} />
          <div className={styles.itemCircle} />
        </div>
        <div className={classNames(styles.item, colorClassName)}>
          <div className={styles.itemLine} />
          <div className={styles.itemCircle} />
        </div>
      </div>
    );
  }
}

export default SliderIcon;
