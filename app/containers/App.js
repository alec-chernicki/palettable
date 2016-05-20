import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  toggleColorPicker, addColorIfValid, removeColorIfValid, changeColorIfValid
} from '../actions'

import Title from '../components/Title'
import Footer from '../components/Footer'
import ColorList from '../components/ColorList'
import Onboarding from '../components/Onboarding/Onboarding'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.addColor()

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
    const { isFetching, addColor, changeColor, removeColor } = this.props
    const tag = e.target.tagName.toLowerCase()

    if(!isFetching && tag != 'input') {
      if (e.which === 76) {
        addColor()
      }
      else if (e.which === 68) {
        changeColor()
      }
      else if (e.which === 8) {
        removeColor()
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
      <div>
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
  addColor: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  removeColor: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboardingStep: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  const { colors, onboardingStep, fetchedPalette } = state
  return {
    colors,
    onboardingStep,
    isFetching: fetchedPalette.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addColor () {
      return dispatch(addColorIfValid())
    },
    changeColor () {
      return dispatch(changeColorIfValid())
    },
    removeColor () {
      return dispatch(removeColorIfValid())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
