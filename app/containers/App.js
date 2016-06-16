import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { isHex } from '../../utils/helpers';
import {
  addColorIfValid, removeColorIfValid, changeColorIfValid, animateColorStatus, completeOnboarding,
  addColor,
} from '../actions';

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem('onboardingCompletedPreviously')) {
      this.props.dispatch(completeOnboarding());
    }
  }
  componentDidMount() {
    const { palette } = this.props.params;
    if (palette) {
      this.addColorsInParams(palette);
    } else {
      this.props.dispatch(addColorIfValid());
    }
    localStorage.setItem('onboardingCompletedPreviously', true);

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.onkeydown = this.suppressBackspace.bind(this);
    document.onkeypress = this.suppressBackspace.bind(this);
  }
  addColorsInParams(palette) {
    const formattedPalette = palette.split('-').filter((color) => isHex(color));

    for (let i = 0; i < formattedPalette.length; i++) {
      this.props.dispatch(addColor(`#${formattedPalette[i]}`));
    }
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
      } else {
        dispatch(animateColorStatus(colors[colors.length - 1]));
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
