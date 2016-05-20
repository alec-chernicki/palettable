import { connect } from 'react-redux'
import {
  invalidatePalette, changeColorText, resetColorName, editColorText
} from '../actions'
import ColorName from '../components/ColorName'


const mapStateToProps = (state, ownProps) => {
  const { color, editedColor } = ownProps.color
  return {
    value: editedColor || color
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTextChangeSubmit: (color, text) => {
      const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      const colorText = /#/.test(text) ? text : '#' + text

      if (regex.test(colorText)) {
        dispatch(invalidatePalette())
        dispatch(changeColorText(color, colorText))
      }
      else {
        dispatch(resetColorName(color))
      }
    },
    onTextEdit: (color, text) => {
      dispatch(editColorText(color, text))
    }
  }
}

const VisibleColorName = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorName)

export default VisibleColorName
