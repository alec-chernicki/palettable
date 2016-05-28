import React, { PropTypes, Component } from 'react';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

class ColorPicker extends Component {
  handleChange(data) {
    this.props.onChange(data);
  }
  render() {
    return (
      <div className="popover">
        <div className="cover" onClick={this.handlePickerToggle.bind(this)} />
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
};

export default CustomPicker(ColorPicker);
