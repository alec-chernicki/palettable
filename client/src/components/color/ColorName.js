// @flow
import styles from './ColorName.scss';
import React from 'react';
import { partial } from 'underscore';
import getInterfaceAttributes from '../../utilities/getInterfaceAttributes';
import isHex from '../../utilities/isHex';
import Color from 'color';
import type { ColorType } from '../../constants/FlowTypes';
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
  onBlur: (hexCode: string) => mixed,
};

type State = {
  isEditing: boolean,
  shownHexCode: string,
};

const _formatToHashedString = (hexCode: string): string => {
  if (hexCode[0] !== '#') {
    return `#${hexCode}`;
  }

  return hexCode;
};

class ColorName extends React.Component<Props, State> {
  static defaultProps = {
    onBlur: () => {},
  };

  state = {
    isEditing: false,
    shownHexCode: this.props.color.hexCode,
  };

  componentWillReceiveProps(nextProps) {
    const { shownHexCode, isEditing } = this.state;

    if (nextProps.color.hexCode !== shownHexCode && !isEditing) {
      this.setState({ shownHexCode: nextProps.color.hexCode });
    }
  }

  handleFocus = e => {
    this.setState({ isEditing: true });
  };

  handleChange = (changeColor, e) => {
    const { color } = this.props;
    const { value }: { value: string } = e.target;
    const formattedValue = _formatToHashedString(value);

    this.setState({ shownHexCode: value });

    if (isHex(formattedValue)) {
      changeColor({ variables: { id: color.id, hexCode: formattedValue } });
    }
  };

  handleBlur = (changeColor, e) => {
    const { color } = this.props;
    const { value }: { value: string } = e.target;
    const formattedValue = _formatToHashedString(value);

    if (!isHex(formattedValue)) {
      return this.setState({ shownHexCode: color.hexCode });
    }

    this.setState({ shownHexCode: Color(formattedValue).hex() });
    changeColor({ variables: { id: color.id, hexCode: formattedValue } });
  };

  render() {
    const { shownHexCode } = this.state;
    const {
      color: { hexCode },
    } = this.props;
    const interfaceAttributes = getInterfaceAttributes(hexCode);

    const style = {
      color: interfaceAttributes.color,
    };

    return (
      <Mutation mutation={CHANGE_COLOR_MUTATION}>
        {(changeColor, { data }) => {
          return (
            <input
              type="text"
              className={styles.colorName}
              value={shownHexCode}
              style={style}
              onFocus={this.handleFocus}
              onChange={partial(this.handleChange, changeColor)}
              onBlur={partial(this.handleBlur, changeColor)}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default ColorName;
