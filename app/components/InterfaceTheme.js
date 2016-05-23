import React, { PropTypes } from 'react'
import Color from 'color'

const InterfaceTheme = ({color, children}) => {
  const luminosity = Color(color).luminosity()
  const themeClass = luminosity < 0.55 ? 'theme-light' : 'theme-dark'

  return (
    <div className={ themeClass }>
      { children }
    </div>
  )
}

InterfaceTheme.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default InterfaceTheme
