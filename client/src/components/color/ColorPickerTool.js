// @flow
import React from 'react';
import ColorPicker from './ColorPicker';
import UISliderIcon from '../../ui-library/icons/UISliderIcon';
import UIPopover from '../../ui-library/popover/UIPopover';
import type { ColorType } from '../../../constants/FlowTypes';

type Props = {
  color: ColorType,
  onClick: () => {},
  onChange: (hexCode: string) => {},
  onBlur: () => {},
  isActive: boolean,
};

class ColorPickerTool extends React.PureComponent<Props> {
  static defaultProps = {
    onClick: () => {},
    onChange: () => {},
    onBlur: () => {},
  };

  state = {
    isActive: false,
  };

  handleBlur = () => {
    console.log('blur');
    this.setState({ isActive: false });
  };

  handleChange = colorData => {
    const { onChange } = this.props;

    onChange(colorData.hex.toUpperCase());
  };

  handleClick = e => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };

  renderColorPicker() {
    const {
      color: { hexCode },
    } = this.props;

    return (
      <ColorPicker
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        color={hexCode}
      />
    );
  }

  render() {
    const { color } = this.props;
    const { isActive } = this.state;

    return (
      <UIPopover
        placement="bottom"
        isOpen={isActive}
        content={this.renderColorPicker()}
      >
        <UISliderIcon
          hexCode={color.hexCode}
          active={isActive}
          onClick={this.handleClick}
        />
      </UIPopover>
    );
  }
}

export default ColorPickerTool;
