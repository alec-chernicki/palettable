import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  continueOnboarding, animateColorStatus,
  addColor, removeColor, changeColor,
  fetchColorFromPaletteIfNeeded, invalidatePalette,
} from '../actions'

import Title from '../components/Title'
import Tweet from '../components/Tweet'
import ColorList from '../components/ColorList'
import Onboarding from '../components/Onboarding/Onboarding'

class App extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    const { dispatch, shownColors } = this.props
    dispatch(
      fetchColorFromPaletteIfNeeded(shownColors)
    ).then(color => {
      dispatch(addColor(color))
    })

    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  componentWillUnmount () {
    document.removeListener('keydown', this.handleKeydown);
  }
  handleKeydown (e) {
    e.preventDefault()

    const { dispatch, shownColors, isFetching, onboardingStep } = this.props

    const onboardingStatus = onboardingStep < 3 ? onboardingStep : true

    if(!isFetching) {
      if (e.which === 76 && shownColors.length < 5 &&
        (onboardingStep === 0 || onboardingStep > 2)) {
        dispatch(
          fetchColorFromPaletteIfNeeded(shownColors)
        ).then(color => {
          dispatch(addColor(color))
          const likedColor = shownColors[shownColors.length - 1] || shownColors[0]

          dispatch(animateColorStatus(likedColor))

          // FIXME: This logic feels weird here
          dispatch(continueOnboarding())
        })
      }
      else if (e.which === 68 &&
        (onboardingStep === 1 || onboardingStep > 2)) {
        // FIXME: Possible race condition here
        dispatch(invalidatePalette())
        dispatch(
          fetchColorFromPaletteIfNeeded(shownColors)
        ).then(color => {
          dispatch(changeColor(color))
          const  { shownColors } = this.props
          const changedColor = shownColors[shownColors.length - 1];
          console.log(changedColor);
          dispatch(animateColorStatus(changedColor))

          dispatch(continueOnboarding())
        })
      }
      else if (e.which === 8 && shownColors.length > 1 &&
        onboardingStep >= 2) {;
        // REMOVE
        // FIXME: Possible race condition here
        dispatch(invalidatePalette())
        dispatch(removeColor(...shownColors.slice(-1)))

        dispatch(continueOnboarding())
      }
    }
  }
  render () {
    const { shownColors, isFetching, onboardingStep } = this.props
    if (shownColors.length === 0) {
      return <h1 className='loading' style={{zIndex: 10000, position: 'relative'}}>Loading</h1>
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
          isFetching={isFetching} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { shownColors, onboardingStep, fetchedPalette } = state;
  return {
    shownColors,
    onboardingStep,
    // containerStatusText: shownColors[shownColors.length - 1].statusText,
    isFetching: fetchedPalette.isFetching
  }
}

export default connect(mapStateToProps)(App)
