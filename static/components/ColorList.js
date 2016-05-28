import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SyncedColor from '../containers/SyncedColor';

const ColorList = ({ colors, isFetching }) => {
  const colorItems = colors.map(color => (
    <SyncedColor key={color.id} color={color} />
  ));

  const containerClassName = isFetching ? 'searching color-list' : 'color-list';

  return (
    <ReactCSSTransitionGroup
      component="ul"
      className={containerClassName}
      transitionName={'color-animation'}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={350}
    >
      {colorItems}
    </ReactCSSTransitionGroup>
  );
};


ColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ColorList;
