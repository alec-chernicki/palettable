import React, { PropTypes } from 'react';

class ColorName extends React.Component {
  handleChange(e) {
    this.props.onChange(this.props.color, e.target.value);
  }
  handleSubmit(e) {
    this.props.onSubmit(this.props.color, e.target.value);
  }
  render() {
    return (
      <input
        type="text"
        className="color-text"
        value={this.props.colorValue}
        onChange={this.handleChange.bind(this)}
        onBlur={this.handleSubmit.bind(this)}
      />
  );
  }
}

ColorName.propTypes = {
  color: PropTypes.object.isRequired,
  colorValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ColorName;
