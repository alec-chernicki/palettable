// @flow
import styles from './ColorName.scss';
import React from 'react';
import getInterfaceAttributes from '../../utilities/getInterfaceAttributes';
import isHex from '../../utilities/isHex';
import Color from 'color';
import type { ColorType } from '../../constants/FlowTypes';

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

  handleChange = e => {
    const { value }: { value: string } = e.target;
    const formattedValue = _formatToHashedString(value);

    this.setState({ shownHexCode: value });

    if (isHex(formattedValue)) {
      this.props.onBlur(formattedValue);
    }
  };

  handleBlur = e => {
    const {
      color: { hexCode },
    } = this.props;
    const { value }: { value: string } = e.target;
    const formattedValue = _formatToHashedString(value);

    if (!isHex(formattedValue)) {
      return this.setState({ shownHexCode: hexCode });
    }

    this.setState({ shownHexCode: Color(formattedValue).hex() });
    this.props.onBlur(formattedValue);
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
      <input
        type="text"
        className={styles.colorName}
        value={shownHexCode}
        style={style}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default ColorName;
