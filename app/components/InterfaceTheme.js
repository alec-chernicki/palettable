import React, { PropTypes } from 'react'
import Color from 'color'

const InterfaceTheme = ({color, children}) => {
  const luminosity = Color(color).luminosity()
  const themeClass = luminosity < 0.6 ? 'theme-light' : 'theme-dark'

  return (
    <div className={ themeClass }>
      { children }
    </div>
  )
}

InterfaceTheme.propTypes = {
  color: PropTypes.string.isRequired
}

export default InterfaceTheme
