// @flow
import styles from './RemoveColorTool.scss';
import React from 'react';
import { connect } from 'react-redux';
import { removeLikedColor } from '../../../redux/actions/likedColors';
import connectInterfaceColorScheme from '../../decorators/connectInterfaceColorScheme';
import Color from 'color';
import classNames from 'classnames';
import { Tooltip } from 'react-tippy';

type Props = {
  accentHexCode: string,
  isDark: boolean,
  color: Object,
  isOnlyItem: boolean,
};

export const RemoveColorTool = ({
  onClick,
  color,
  isOnlyItem,
  accentHexCode,
}: Props) => {
  const isDark = Color(color.hexCode).dark();
  const colorClassName = isDark ? styles.light : styles.dark;

  if (isOnlyItem) {
    return null;
  }

  return (
    <Tooltip
      className={styles.removeColorTool}
      title="Remove"
      position="top"
      trigger="mouseenter"
      animation="shift"
      arrow={true}
      distance={20}
      theme={isDark ? 'light' : 'dark'}
    >
      <svg
        className={classNames(styles.removeColorToolIcon, colorClassName)}
        data-jest="removeColorTool"
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 408.483 408.483"
      >
        <g>
          <path
            fill={accentHexCode}
            d="M87.748 388.784c.46 11.01 9.52 19.7 20.54 19.7h191.91c11.018 0 20.078-8.69 20.54-19.7L334.44 99.468h-260.4L87.75 388.784zM247.655 171.33c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.74-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.74 8.35-8.35 8.35h-13.356c-4.61 0-8.35-3.737-8.35-8.35V171.33zM343.567 21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.97c-2.378 0-4.305 1.928-4.305 4.305v16.737H64.916c-7.125 0-12.9 5.776-12.9 12.9V74.47h304.45V33.944c0-7.125-5.774-12.9-12.9-12.9z"
          />
        </g>
      </svg>
    </Tooltip>
  );
};

const mapStateToProps = state => {
  return {
    isOnlyItem: state.likedColors.length === 1,
  };
};

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    onClick: () => dispatch(removeLikedColor(color)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectInterfaceColorScheme(RemoveColorTool));
