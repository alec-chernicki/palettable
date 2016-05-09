import React, { PropTypes } from 'react'
import ColorItem from './ColorItem';

const ColorList = ({ shownColors, isFetching }) => {
  const colorItems = shownColors.map(color => {
    return (
      <ColorItem key={ color.id } color={ color.color } />
    )
  })

  return (
    <div className={ isFetching && 'searching' }>
      <ul className='color-list'>
        { colorItems }
      </ul>
    </div>
  )
}

ColorList.propTypes = {
  shownColors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default ColorList
