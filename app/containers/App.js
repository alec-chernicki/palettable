import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import {
  addColorIfValid, removeColorIfValid, changeColorIfValid, animateColorStatus, addColor,
  goToPreviousColorIfValid, loadPaletteFromURLIfValid,
} from '../actions';

class App extends Component {
  componentWillMount() {
    const { dispatch, params: {palette} } = this.props;

    dispatch(loadPaletteFromURLIfValid(palette));

    localStorage.setItem('onboardingCompletedPreviously', true);

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.onkeydown = this.suppressBackspace.bind(this);
    document.onkeypress = this.suppressBackspace.bind(this);
  }
  suppressBackspace(e) {
    const event = e || window.event;
    const target = event.target || event.srcElement;

    if (event.keyCode === 8 && !/input|textarea/i.test(target.nodeName)) {
      return false;
    }
    return true;
  }
  handleKeydown(e) {
    const { isFetching, dispatch, colors } = this.props;
    const tag = e.target.tagName.toLowerCase();

    if (!isFetching && tag !== 'input') {
      if (e.which === 76) {
        dispatch(addColorIfValid());
      } else if (e.which === 68) {
        dispatch(changeColorIfValid());
      } else if (e.which === 8) {
        dispatch(removeColorIfValid());
      } else if (e.which === 37) {
        dispatch(goToPreviousColorIfValid());
      }
    }
  }
  render() {
    const { colors, isFetching, onboarding } = this.props;
    return (
    <Main
        colors={colors}
        isFetching={isFetching}
        onboarding={onboarding}
      />
    );
  }
}

App.propTypes = {
  colors: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboarding: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { onboarding, shownPalette, fetchedPalette } = state;
  return {
    colors: shownPalette.colors,
    onboarding,
    isFetching: fetchedPalette.isFetching,
  };
};

export default connect(mapStateToProps)(App);
