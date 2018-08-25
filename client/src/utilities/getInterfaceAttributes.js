// @flow
import Color from 'color';

const _getInterfaceColor = (colorObject): string => {
  const black = Color('#333');
  const white = Color('#FFF');

  const interfaceColor = colorObject.isDark()
    ? colorObject.mix(white)
    : colorObject.mix(black);

  return interfaceColor.hex();
};

const _getInterfaceClassName = (colorObject): string => {
  return colorObject.isDark() ? 'light' : 'dark';
};

const getInterfaceAttributes = (
  hexCode: string
): { color: string, className: string } => {
  const colorObject = Color(hexCode);

  return {
    color: _getInterfaceColor(colorObject),
    className: _getInterfaceClassName(colorObject),
  };
};

export default getInterfaceAttributes;
