import React, { PropTypes } from 'react'
import ColorName from './ColorName';
import InterfaceTheme from './InterfaceTheme'

const ColorItem = ({ color }) => {

  return (
    <li style={{ backgroundColor: color }} className='color'>
        <InterfaceTheme color={ color }>
          <div className='color-container'>
            <ColorName color={ color }/>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        </InterfaceTheme>
    </li>
  )
}

ColorItem.propTypes = {
  color: PropTypes.string.isRequired
}

export default ColorItem;
