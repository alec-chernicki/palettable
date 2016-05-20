import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import ColorItem from './ColorItem'

class ColorList extends React.Component {
  render () {
    const { colors, isFetching, onAnimateColor, onTextChangeSubmit, onTextEdit, onColorNameReset, onToggleColorPicker } = this.props
    const colorItems = colors.map(color => {
      return (
        <ColorItem
          key={color.id}
          color={color}
          onAnimateColor={onAnimateColor}
          onColorNameReset={onColorNameReset}
          onTextChangeSubmit={onTextChangeSubmit}
          onTextEdit={onTextEdit}
          onToggleColorPicker={onToggleColorPicker}/>
      )
    })

    let containerClassName = isFetching ? 'searching color-list' : 'color-list'
    
    return (
      <ReactCSSTransitionGroup
        component="ul"
        className={containerClassName}
        transitionName={ 'color-animation' }
        transitionEnterTimeout={300}
        transitionLeaveTimeout={350} >
        { colorItems }
      </ReactCSSTransitionGroup>
    )
  }
}

ColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default ColorList
