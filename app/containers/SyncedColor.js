import { connect } from 'react-redux';
import {
  invalidatePalette, changeColorText, resetColorName, editColorText, toggleColorPicker,
  addColorIfValid, changeColorIfValid, closeAllColorPickers,
} from '../actions';
import { isHex } from '../../utils/helpers';
import ColorItem from '../components/ColorItem/ColorItem';

const mapStateToProps = (state, ownProps) => {
  const { color, editedColor } = ownProps.color;
  return {
    colorValue: editedColor || color,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (color, text) => {
    const colorText = /#/.test(text) ? text : `#${text}`;
    if (isHex(colorText)) {
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
  onCloseAllPickers: () => {
    dispatch(closeAllColorPickers());
  },
  onLike: () => {
    dispatch(addColorIfValid());
  },
  onDislike: () => {
    dispatch(changeColorIfValid());
  },
});

const SyncedColor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorItem);

export default SyncedColor;
