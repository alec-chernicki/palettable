import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  continueOnboarding,
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

    const { dispatch, shownColors, isFetching } = this.props

    if(!isFetching) {
      if (e.which === 76 && shownColors.length < 5) {
        dispatch(
          fetchColorFromPaletteIfNeeded(shownColors)
        ).then(color => {
          dispatch(addColor(color))

          // FIXME: This logic feels weird here
          dispatch(continueOnboarding())
        })
      }
      else if (e.which === 68) {
        // FIXME: Possible race condition here
        dispatch(invalidatePalette())
        dispatch(
          fetchColorFromPaletteIfNeeded(shownColors)
        ).then(color => {
          dispatch(changeColor(color))
          dispatch(continueOnboarding())
        })
      }
      else if (e.which === 8 && shownColors.length > 1) {;
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
      return <h1 className='loading'>Loading</h1>
    }

    return (
      <div>
        <Title shownColors={shownColors} />
        <Tweet shownColors={shownColors} />
        <Onboarding
          shownColors={shownColors}
          onboardingStep={onboardingStep} />
        <ColorList
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
    isFetching: fetchedPalette.isFetching
  }
}

export default connect(mapStateToProps)(App)
