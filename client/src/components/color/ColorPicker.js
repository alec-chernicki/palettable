// @flow
import styles from './ColorPicker.scss';
import { partial, omit } from 'underscore';
import React, { Component } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import Color from 'color';

type Props = {
  +onBlur: () => mixed,
  +onChange: (colorData: mixed) => mixed,
  +color: object,
};

class ColorPicker extends Component<Props> {
  componentDidMount() {
    window.addEventListener('mousedown', this.props.onBlur);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleClick = e => {
    e.stopPropagation();
  };

  render() {
    const { onChange } = this.props;

    return (
      <div onClick={this.handleClick} onMouseDown={this.handleClick}>
        <div className={styles.picker}>
          <div className={styles.saturation}>
            <Saturation {...this.props} onChange={onChange} />
          </div>
          <div className={styles.controls}>
            <div className={styles.sliders}>
              <div className={styles.hue}>
                <Hue {...this.props} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPicker);
