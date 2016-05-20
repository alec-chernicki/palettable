import React, { PropTypes } from 'react'
import CustomColorPicker from './CustomColorPicker'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ColorName from './ColorName'
import SliderIcon from './SliderIcon'
import InterfaceTheme from './InterfaceTheme'

const ColorItem = ({
  color, colorValue, onToggleColorPicker, onTextChangeSubmit, onTextEdit
}) => {
  return (
    <li style={{ backgroundColor: color.color }} className='color' key={ color.id }>
      <InterfaceTheme color={ color.color }>
        <div className='color-container'>
          <ColorName
            color={ color }
            colorValue= {colorValue}
            onTextEdit={onTextEdit}
            onTextChangeSubmit={onTextChangeSubmit} />
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
        <SliderIcon onToggle={() => onToggleColorPicker(color)}/>
        <ReactCSSTransitionGroup
          transitionName={ 'color-picker-animation' }
          transitionEnterTimeout={175}
          transitionLeaveTimeout={175} >
          { color.pickerActive ? <div className="popover">
            <div className="cover" onClick={() => onToggleColorPicker(color)}/>
            <CustomColorPicker color={ color.color } onChange={(newColor) => onTextChangeSubmit(color, newColor.hex.toUpperCase())}/>
          </div> : null }
        </ReactCSSTransitionGroup>
      </InterfaceTheme>
    </li>
  )
}

ColorItem.propTypes = {
  color: PropTypes.object.isRequired,
  colorValue: PropTypes.string.isRequired,
  onToggleColorPicker: PropTypes.func.isRequired,
  onTextChangeSubmit: PropTypes.func.isRequired,
  onTextEdit: PropTypes.func.isRequired
}

export default ColorItem
