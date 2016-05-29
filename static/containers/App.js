import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import {
  addColorIfValid, removeColorIfValid, changeColorIfValid, animateColorStatus,
} from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(addColorIfValid());

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
      } else {
        dispatch(animateColorStatus(colors[colors.length - 1]));
      }
    }
  }
  render() {
    const { colors, isFetching, onboardingStep } = this.props;
    return (
      <Main
        colors={colors}
        isFetching={isFetching}
        onboardingStep={onboardingStep}
      />
    );
  }
}

App.propTypes = {
  colors: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboardingStep: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { onboardingStep, shownPalette, fetchedPalette } = state;
  return {
    colors: shownPalette.colors,
    onboardingStep,
    isFetching: fetchedPalette.isFetching,
  };
};

export default connect(mapStateToProps)(App);
