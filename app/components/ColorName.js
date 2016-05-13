import React, { PropTypes } from 'react'

const ColorName = ({color, statusText}) => {
  return (
    <div>
      <p className='color-text'>{ color }</p>
      <p className='status-text'>{ statusText }</p>
    </div>
  )
}

ColorName.propTypes = {
  color: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
}

export default ColorName
