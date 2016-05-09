import React, { PropTypes } from 'react'
import Color from 'color'
import ClassNames from 'classnames'

const InterfaceTheme = ({color, children}) => {
  const luminosity = Color(color).luminosity()
  const themeClass = ClassNames({
    'theme-light': luminosity < 0.6,
    'theme-dark': luminosity >= 0.6
  })

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
