import React, { PropTypes } from 'react'
import getThemeClass from '../utils/helpers'
import InterfaceTheme from './InterfaceTheme'

const Title = ({shownColors}) => {
  // FIXME: Standardize '#' in state
  return (
    <InterfaceTheme color={shownColors[0].color}>
      <a className='title' href='/'>
        <h1>PALETTABLE</h1>
      </a>
    </InterfaceTheme>
  )
}

Title.propTypes = {
  shownColors: PropTypes.array.isRequired
}

export default Title
