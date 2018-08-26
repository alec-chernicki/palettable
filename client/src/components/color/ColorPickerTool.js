// @flow
import React from 'react';
import { partial } from 'underscore';
import ColorPicker from './ColorPicker';
import UISliderIcon from '../../ui-library/icons/UISliderIcon';
import UIPopover from '../../ui-library/popover/UIPopover';
import type { ColorType } from '../../../constants/FlowTypes';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CHANGE_COLOR_MUTATION = gql`
  mutation ChangeColor($id: ID!, $hexCode: String!) {
    changeColor(id: $id, hexCode: $hexCode) @client {
      id
    }
  }
`;

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
    this.setState({ isActive: false });
  };

  handleClick = e => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  };

  handleChange = (changeColor, { hex }) => {
    const { color } = this.props;

    changeColor({
      variables: {
        id: color.id,
        hexCode: hex.toUpperCase(),
      },
    });
  };

  renderColorPicker() {
    const { color } = this.props;

    return (
      <Mutation mutation={CHANGE_COLOR_MUTATION}>
        {(changeColor, { data }) => {
          return (
            <ColorPicker
              onBlur={this.handleBlur}
              onChange={partial(this.handleChange, changeColor)}
              color={color.hexCode}
            />
          );
        }}
      </Mutation>
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
