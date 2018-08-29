// @flow
import styles from './ColorPicker.scss';
import React, { Component } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

type Props = {
  +onBlur: () => mixed,
  +onChange: (colorData: mixed) => mixed,
};

class ColorPicker extends Component<Props> {
  componentDidMount() {
    window.addEventListener('mousedown', this.props.onBlur);
  }

  handleClick = e => {
    e.stopPropagation();
  };

  handleChange(colorData) {
    this.props.onChange(colorData);
  }

  render() {
    return (
      <div onClick={this.handleClick} onMouseDown={this.handleClick}>
        <div className={styles.picker}>
          <div className={styles.saturation}>
            <Saturation
              {...this.props}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.sliders}>
              <div className={styles.hue}>
                <Hue {...this.props} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPicker, styles);
