// @flow

const urlAdapter = (colors: Array<Object>): Array<string> => {
  if (!Array.isArray(colors)) {
    return [];
  }

  return colors.map(color => {
    return color.hexCode;
  });
};

export default urlAdapter;
