import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  continueOnboarding, animateColorStatus,
  changeColorText, editColorText, resetColorName,
  addColor, removeColor, changeColor,
  fetchColorFromPaletteIfNeeded, invalidatePalette,
} from '../actions'

import Title from '../components/Title';
import Tweet from '../components/Tweet';
import ColorList from '../components/ColorList';
import Onboarding from '../components/Onboarding/Onboarding';

class App extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.onAddColor(this.props.shownColors)

    document.addEventListener('keydown', this.handleKeydown.bind(this))
    document.onkeydown = this.suppressBackspace.bind(this)
    document.onkeypress = this.suppressBackspace.bind(this)
  }
  suppressBackspace (evt) {
      evt = evt || window.event;
      var target = evt.target || evt.srcElement;

      if (evt.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
          return false;
      }
  }
  componentWillUnmount () {
    document.removeListener('keydown', this.handleKeydown);
  }
  handleKeydown (e) {
    const { shownColors, isFetching, onContinueOnboarding, onboardingStep } = this.props
    // TODO: Refactor this complex checking logic into an action creator
    if(!isFetching) {
      if (e.which === 76 && shownColors.length < 5 && (onboardingStep === 0 || onboardingStep > 2)) {
        this.props.onAddColor(shownColors)
          .then(onContinueOnboarding)
      }
      else if (e.which === 68 && (onboardingStep === 1 || onboardingStep > 2)) {
        this.props.onChangeColor(shownColors)
          .then(onContinueOnboarding)
      }
      else if (e.which === 8 && shownColors.length > 1 && onboardingStep >= 2) {
        this.props.onRemoveColor(shownColors)
          .then(onContinueOnboarding)
      }
    }
  }
  render () {
    const { shownColors, isFetching, onboardingStep, onTextChangeSubmit, onTextEdit, onColorNameReset } = this.props
    if (shownColors.length === 0) {
      return (
        <div className='loading-cotainer'>
          <h1 className='loading'>Loading</h1>
        </div>
      )
    }

    return (
      <div>
        <Title shownColors={shownColors} />
        <Tweet shownColors={shownColors} />
        <Onboarding
          shownColors={shownColors}
          onboardingStep={onboardingStep} />
        <ColorList
          onAnimateColor={animateColorStatus}
          shownColors={shownColors}
          isFetching={isFetching}
          onColorNameReset={onColorNameReset}
          onTextEdit={onTextEdit}
          onTextChangeSubmit={onTextChangeSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { shownColors, onboardingStep, fetchedPalette } = state;
  return {
    shownColors,
    onboardingStep,
    isFetching: fetchedPalette.isFetching
  }
}

const mapDispatchToProps= (dispatch, ownProps) => {
  return {
    onTextEdit (color, text) {
      dispatch(editColorText(color, text))
    },
    onTextChangeSubmit (color, text) {
      const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
      if (regex.test(text)) {
        dispatch(changeColorText(color, text))
      }
      else {
        dispatch(resetColorName(color))
      }
    },
    // FIXME: Refactor into redux-thunk to avoid passing as param to make more composable
    onAddColor (shownColors) {
      return dispatch(
        fetchColorFromPaletteIfNeeded(shownColors)
      ).then(color => {
        dispatch(addColor(color))
      })
    },
    onChangeColor (shownColors) {
      // FIXME: Possible race condition here
      dispatch(invalidatePalette())

      return dispatch(
        fetchColorFromPaletteIfNeeded(shownColors)
      ).then(color => {
        dispatch(changeColor(color))
      })
    },
    onRemoveColor (shownColors) {
      // FIXME: Possible race condition here
      dispatch(invalidatePalette())

      dispatch(removeColor(...shownColors.slice(-1)))

      // TODO: Returning promise since the others return a promisified AJAX call,
      // Is there a better way to do this than to just return a promise resolve
      return Promise.resolve()
    },
    onContinueOnboarding () {
      dispatch(continueOnboarding())
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
