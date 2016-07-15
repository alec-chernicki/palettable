import './ColorItem.scss';

import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ColorName from '../ColorName/ColorName';
import ColorPicker from '../ColorPicker/ColorPicker';
import SliderIcon from '../SliderIcon/SliderIcon';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

class ColorItem extends Component {
  handlePickerToggle() {
    this.props.onTogglePicker(this.props.color);
  }
  handleColorChange(newColor) {
    this.props.onSubmit(this.props.color, newColor.hex.toUpperCase());
  }
  render() {
    const {
      color, colorValue, onSubmit, onChange, onLike, onPrevious, onDislike, onCloseAllPickers,
    } = this.props;
    return (
      <li key={color.id} style={{ backgroundColor: color.color }} className="color">
        <InterfaceTheme color={color.color}>
          <div className="color-container">
            <ColorName
              color={color}
              colorValue={colorValue}
              onChange={onChange}
              onSubmit={onSubmit}
              onFocus={onCloseAllPickers}
            />
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
          <SliderIcon
            toggled={color.pickerActive}
            onToggle={this.handlePickerToggle.bind(this)}
          />
          <ReactCSSTransitionGroup
            transitionName={"color-picker-animation"}
            transitionEnterTimeout={175}
            transitionLeaveTimeout={175}
          >
            {color.pickerActive ?
              <ColorPicker
                onChange={this.handleColorChange.bind(this)}
                onToggle={this.handlePickerToggle.bind(this)}
                color={color.color}
              />
              : null
            }
          </ReactCSSTransitionGroup>
          <div className="color-footer">
            <div className="instructions-container dislike" onClick={onDislike}>
              <span className="keyboard-button">D</span>
              <span className="keyboard-text">Dislike</span>
            </div>
            <div className="instructions-container remove" onClick={onRemove}>
              <span className="keyboard-button">Del</span>
              <span className="keyboard-text">Remove</span>
            </div>
            <div className="instructions-container like" onClick={onLike}>
              <span className="keyboard-button">L</span>
              <span className="keyboard-text">Like</span>
            </div>
          </div>
        </InterfaceTheme>
      </li>
    );
  }
}

// TODO: This component might be getting too much responsibility, consider refactor
ColorItem.propTypes = {
  color: PropTypes.object.isRequired,
  colorValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onTogglePicker: PropTypes.func.isRequired,
  onCloseAllPickers: PropTypes.func.isRequired,
};

export default ColorItem;
