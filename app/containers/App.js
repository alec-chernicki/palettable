import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addColorIfValid, removeColorIfValid, changeColorIfValid } from '../actions'

import Title from '../components/Title'
import Footer from '../components/Footer'
import ColorList from '../components/ColorList'
import Onboarding from '../components/Onboarding/Onboarding'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.dispatch(addColorIfValid())

    document.addEventListener('keydown', this.handleKeydown.bind(this))
    document.onkeydown = this.suppressBackspace.bind(this)
    document.onkeypress = this.suppressBackspace.bind(this)
  }
  suppressBackspace (e) {
    const event = e || window.event
    const target = event.target || event.srcElement

    if (event.keyCode === 8 && !/input|textarea/i.test(target.nodeName)) {
      return false
    }
  }
  handleKeydown (e) {
    const { isFetching, dispatch } = this.props
    const tag = e.target.tagName.toLowerCase()

    if(!isFetching && tag != 'input') {
      if (e.which === 76) {
        dispatch(addColorIfValid())
      }
      else if (e.which === 68) {
        dispatch(changeColorIfValid())
      }
      else if (e.which === 8) {
        dispatch(removeColorIfValid())
      }
    }
  }
  render () {
    const { colors, isFetching, onboardingStep } = this.props

    if (colors.length === 0) {
      return (
        <div className='loading-cotainer'>
          <h1 className='loading'>Loading</h1>
        </div>
      )
    }
    return (
      <div className={onboardingStep <= 3 && 'onboarding-active'}>
        <Title colors={ colors } />
        <Onboarding colors={ colors } onboardingStep={ onboardingStep } />
        <div className='main-container'>
          <ColorList colors={ colors } isFetching={ isFetching } />
          <Footer />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboardingStep: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  const { onboardingStep, shownPalette, fetchedPalette } = state
  return {
    colors: shownPalette.colors,
    onboardingStep,
    isFetching: fetchedPalette.isFetching
  }
}

export default connect(mapStateToProps, null)(App)
