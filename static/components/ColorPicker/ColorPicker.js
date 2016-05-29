import './ColorPicker.scss';

import React, { PropTypes, Component } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

class ColorPicker extends Component {
  handleChange(color, newColor) {
    this.props.onChange(this.props.currentColor, newColor);
  }
  render() {
    return (
      <div className="popover">
        <div className="cover" onClick={this.props.onToggle} />
        <div className="picker">
          <div className="saturation">
            <Saturation
              {...this.props}
              className="saturation-main"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="controls">
            <div className="sliders">
              <div className="hue">
                <Hue
                  {...this.props}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentColor: PropTypes.object.isRequired,
};

export default CustomPicker(ColorPicker);
