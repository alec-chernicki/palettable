import React, { PropTypes } from 'react'

const ColorName = ({ color, onTextChangeSubmit, onTextEdit, value }) => {
  return (
    <div>
      <input type="text"
        className='color-text'
        value={value}
        onChange={(e) => onTextEdit(color, e.target.value)}
        onBlur={() => onTextChangeSubmit(color, color.editedColor)}/>
    </div>
  )
}

ColorName.propTypes = {
  color: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onTextEdit: PropTypes.func.isRequired,
  onTextChangeSubmit: PropTypes.func.isRequired
}

export default ColorName
