import React, { PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import ColorName from './ColorName';
import InterfaceTheme from './InterfaceTheme';

const ColorItem = ({color}) => {
    return (
      <li style={{backgroundColor: color.color }}
        className='color'
        key={ color.id }>
          <InterfaceTheme color={ color.color }>
            <div className='color-container'>
              <ColorName color={ color.color } statusText={color.statusText}/>
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
  color: PropTypes.object.isRequired
}

export default ColorItem;
