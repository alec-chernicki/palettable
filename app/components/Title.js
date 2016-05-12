import React, { PropTypes } from 'react'
import InterfaceTheme from './InterfaceTheme'

const Title = ({shownColors}) => {
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
