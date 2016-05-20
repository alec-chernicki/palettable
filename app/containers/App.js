import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  continueOnboarding, animateColorStatus,
  changeColorText, editColorText, resetColorName, toggleColorPicker,
  addColor, removeColor, changeColor,
  fetchColorFromPaletteIfNeeded, invalidatePalette,
} from '../actions'

import Title from '../components/Title';
// import Tweet from '../components/Tweet';
import ColorList from '../components/ColorList';
import Onboarding from '../components/Onboarding/Onboarding';

class App extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.onAddColor(this.props.colors)

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
    const { colors, isFetching, onContinueOnboarding, onboardingStep } = this.props
    const tag = e.target.tagName.toLowerCase();

    // TODO: Refactor this complex checking logic into an action creator
    if(!isFetching && tag != 'input') {
      if (e.which === 76 && colors.length < 5 && (onboardingStep === 0 || onboardingStep > 2)) {
        this.props.onAddColor(colors)
          .then(() => {
            //FIXME: This check should not be here
            if (onboardingStep <= 2) {
              onContinueOnboarding()
            }
          })

      }
      else if (e.which === 68 && (onboardingStep === 1 || onboardingStep > 2)) {
        this.props.onChangeColor(colors)
          .then(() => {
            //FIXME: This check should not be here
            if (onboardingStep <= 2) {
              onContinueOnboarding()
            }
          })
      }
      else if (e.which === 8 && colors.length > 1 && onboardingStep >= 2) {
        this.props.onRemoveColor(colors)
          .then(() => {
            //FIXME: This check should not be here
            if (onboardingStep <= 2) {
              onContinueOnboarding()
            }
          })
      }
    }
  }
  render () {
    const { colors, isFetching, onboardingStep, onTextChangeSubmit, onTextEdit, onColorNameReset, onToggleColorPicker } = this.props
    if (colors.length === 0) {
      return (
        <div className='loading-cotainer'>
          <h1 className='loading'>Loading</h1>
        </div>
      )
    }

    return (
      <div>
        <Title colors={colors} />
        <Onboarding
          colors={colors}
          onboardingStep={onboardingStep} />
        <div className='main-container'>
          <ColorList
            onAnimateColor={animateColorStatus}
            colors={colors}
            isFetching={isFetching}
            onColorNameReset={onColorNameReset}
            onTextEdit={onTextEdit}
            onTextChangeSubmit={onTextChangeSubmit}
            onToggleColorPicker={onToggleColorPicker}/>
          <div className='social-bar'>
            <a className='social-icon' href='#'/>
            <p className='social-text'>
              Made By
              <a href='http://www.alecortega.com/' className='social-name'> Alec Ortega</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { colors, onboardingStep, fetchedPalette } = state;
  return {
    colors,
    onboardingStep,
    isFetching: fetchedPalette.isFetching
  }
}

const mapDispatchToProps= (dispatch, ownProps) => {
  return {
    onToggleColorPicker (color) {
      dispatch(toggleColorPicker(color))
    },
    onTextEdit (color, text) {
      dispatch(editColorText(color, text))
    },
    onTextChangeSubmit (color, text) {
      const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
      const colorText = /#/.test(text) ? text : '#' + text
      if (regex.test(colorText)) {
        dispatch(invalidatePalette())
        dispatch(changeColorText(color, colorText))
      }
      else {
        dispatch(resetColorName(color))
      }
    },
    // FIXME: Refactor into redux-thunk to avoid passing as param to make more composable
    onAddColor (colors) {
      return dispatch(
        fetchColorFromPaletteIfNeeded(colors)
      ).then(color => {
        dispatch(addColor(color))
      })
    },
    onChangeColor (colors) {
      // FIXME: Possible race condition here
      dispatch(invalidatePalette())

      return dispatch(
        fetchColorFromPaletteIfNeeded(colors)
      ).then(color => {
        dispatch(changeColor(color))
      })
    },
    onRemoveColor (colors) {
      // FIXME: Possible race condition here
      dispatch(invalidatePalette())

      dispatch(removeColor(...colors.slice(-1)))

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
