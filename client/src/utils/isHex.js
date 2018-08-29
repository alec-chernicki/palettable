// @flow

const isHex = (color: string): boolean => {
  const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  const colorText: string = /#/.test(color) ? color : `#${color}`;

  return regex.test(colorText);
};

export default isHex;
