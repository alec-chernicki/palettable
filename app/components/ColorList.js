import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import ColorItem from './ColorItem'

class ColorList extends React.Component {
  render () {
    const colorItems = this.props.shownColors.map(color => {
      return <ColorItem key={color.id} color={color} />
    })

    return (
      <div className={ this.props.isFetching && 'searching' }>
        <ReactCSSTransitionGroup
          component="ul"
          className='color-list'
          transitionName='color-animation'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300} >
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
