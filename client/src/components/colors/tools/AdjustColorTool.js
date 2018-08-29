// @flow
import React from 'react';
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import ColorPicker from './ColorPicker';
import SliderIcon from './SliderIcon';
import { changeLikedColor } from '../../../redux/actions/likedColors';
import UIPopover from '../../shared/popover/UIPopover';
import type { ColorType } from '../../../constants/FlowTypes';
import Color from 'color';

type Props = {
  color: ColorType,
  onChange: (hexCode: string) => {},
};

type State = {
  isActive: boolean,
};

class AdjustColorTool extends React.Component<Props, State> {
  state = {
    isActive: false,
  };

  handleChange = colorData => {
    const { onChange } = this.props;

    onChange(colorData.hex.toUpperCase());
  };

  handleBlur = isActive => {
    this.setState({ isActive: false });
  };

  handleClick = () => {
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
    const { isActive } = this.state;
    const { color } = this.props;
    const isDark = Color(color.hexCode).dark();

    return (
      <UIPopover
        placement="bottom"
        isOpen={isActive}
        content={this.renderColorPicker()}
      >
        <Tooltip
          title="Adjust"
          position="top"
          trigger="mouseenter"
          animation="shift"
          arrow={true}
          distance={-5}
          theme={isDark ? 'light' : 'dark'}
        >
          <SliderIcon
            hexCode={color.hexCode}
            active={isActive}
            onClick={this.handleClick}
          />
        </Tooltip>
      </UIPopover>
    );
  }
}

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    onChange: hexCode =>
      dispatch(changeLikedColor({ color, newHexCode: hexCode })),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdjustColorTool);
