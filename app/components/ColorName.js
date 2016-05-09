import React, { PropTypes } from 'react'

const ColorName = ({color}) => {
  return (
    <p className='color-text'>{ color }</p>
  )
}

ColorName.propTypes = {
  color: PropTypes.string.isRequired
}

export default ColorName
