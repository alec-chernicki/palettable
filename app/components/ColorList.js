import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import ColorItem from './ColorItem'

class ColorList extends React.Component {
  render () {
    const { shownColors, isFetching, onAnimateColor, onTextChangeSubmit, onTextEdit, onColorNameReset } = this.props
    const colorItems = shownColors.map(color => {
      return (
        <ColorItem
          key={color.id}
          color={color}
          onAnimateColor={onAnimateColor}
          onColorNameReset={onColorNameReset}
          onTextChangeSubmit={onTextChangeSubmit}
          onTextEdit={onTextEdit} />
      )
    })

    // FIXME: EWww refactor
    const statusText = shownColors[shownColors.length - 1].statusText
    const containerClassName = isFetching ? 'searching ' + statusText : statusText

    return (
      <div className={containerClassName}>
        <ReactCSSTransitionGroup
          component="ul"
          className='color-list'
          transitionName={ 'color-animation' }
          transitionEnterTimeout={300}
          transitionLeaveTimeout={350} >
          { colorItems }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

ColorList.propTypes = {
  shownColors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default ColorList
