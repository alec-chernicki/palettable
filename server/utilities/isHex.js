exports.isHex = color => {
  const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  const colorText = /#/.test(color) ? color : `#${color}`;

  return regex.test(colorText);
};
