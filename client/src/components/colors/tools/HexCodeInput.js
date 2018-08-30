// @flow
import styles from './HexCodeInput.scss';
import React from 'react';
import { connect } from 'react-redux';
import { changeLikedColor } from '../../../redux/actions/likedColors';
import isHex from '../../../utils/isHex';
import Color from 'color';
import classNames from 'classnames';
import type { ColorType } from '../../../constants/FlowTypes';
import connectInterfaceColorScheme from '../../decorators/connectInterfaceColorScheme';

type Props = {
  color: ColorType,
  dispatchChangeLikedColor: (hexCode: string) => mixed,
  accentHexCode: string,
  isDark: boolean,
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

export class HexCodeInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isEditing: false,
      shownHexCode: props.color.hexCode,
    };
  }

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
      this.props.dispatchChangeLikedColor(formattedValue);
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
    this.props.dispatchChangeLikedColor(formattedValue);
  };

  render() {
    const { shownHexCode } = this.state;
    const {
      color: { hexCode },
      accentHexCode,
    } = this.props;
    const isDark = Color(hexCode).dark();
    const colorClassName = isDark ? styles.light : styles.dark;

    const style = {
      color: accentHexCode,
    };

    return (
      <input
        data-jest="hexCodeInput"
        type="text"
        className={classNames(styles.hexCodeInput, colorClassName)}
        value={shownHexCode}
        style={style}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, { color }: Props) => {
  return {
    dispatchChangeLikedColor: (newHexCode: string) => {
      dispatch(
        changeLikedColor({
          color,
          newHexCode: newHexCode,
        })
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(connectInterfaceColorScheme(HexCodeInput));
