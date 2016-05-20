import React, { PropTypes } from 'react'
import InterfaceTheme from './InterfaceTheme'

const Title = ({colors}) => {
  return (
    <InterfaceTheme color={colors[0].color}>
      <a className='title' href='/'>
        <h1>PALETTABLE</h1>
      </a>
    </InterfaceTheme>
  )
}

Title.propTypes = {
  colors: PropTypes.array.isRequired
}

export default Title
