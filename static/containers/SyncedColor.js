import { connect } from 'react-redux';
import {
  invalidatePalette, changeColorText, resetColorName, editColorText, toggleColorPicker,
} from '../actions';
import ColorItem from '../components/ColorItem';

const mapStateToProps = (state, ownProps) => {
  const { color, editedColor } = ownProps.color;
  return {
    colorValue: editedColor || color,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (color, text) => {
    const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    const colorText = /#/.test(text) ? text : `#${text}`;

    if (regex.test(colorText)) {
      dispatch(invalidatePalette());
      dispatch(changeColorText(color, colorText));
    } else {
      dispatch(resetColorName(color));
    }
  },
  onChange: (color, text) => {
    dispatch(editColorText(color, text));
  },
  onTogglePicker: (color) => {
    dispatch(toggleColorPicker(color));
  },
});

const SyncedColor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorItem);

export default SyncedColor;
