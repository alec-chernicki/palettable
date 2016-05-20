import React, { PropTypes } from 'react'

const ColorName = ({ color, onTextChangeSubmit, onTextEdit, colorValue }) => {
  return (
    <div>
      <input type="text"
        className='color-text'
        value={colorValue}
        onChange={(e) => onTextEdit(color, e.target.value)}
        onBlur={() => onTextChangeSubmit(color, color.editedColor)}/>
    </div>
  )
}

ColorName.propTypes = {
  color: PropTypes.object.isRequired,
  colorValue: PropTypes.string.isRequired,
  onTextEdit: PropTypes.func.isRequired,
  onTextChangeSubmit: PropTypes.func.isRequired
}

export default ColorName
