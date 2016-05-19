import React, {Component} from 'react'
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common'

class MyColorPicker extends Component {
  handleChange(data) {
    this.props.onChange(data)
  }
  render() {
    return (
        <div className="picker">
          <div className="saturation">
            <Saturation className="saturation-main" {...this.props} onChange={ this.handleChange.bind(this) }/>
          </div>
          <div className="flexbox-fix controls">
            <div className="sliders">
              <div className="hue">
                <Hue {...this.props} onChange={ this.handleChange.bind(this) } />
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default CustomPicker(MyColorPicker);
