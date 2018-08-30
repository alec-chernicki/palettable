import isHex from './isHex';

const isNotHexInputs = ['a', 'apple', '!!!'];
const isHexInputs = ['aaa', '999', '999999', '#FFF', '#FFFFFF'];

describe('isHex', () => {
  isHexInputs.forEach(isHexInput => {
    it(`returns true for input ${isHexInput}`, () => {
      expect(isHex(isHexInput)).toEqual(true);
    });
  });

  isNotHexInputs.forEach(isNotHexInput => {
    it(`returns true for input ${isNotHexInput}`, () => {
      expect(isHex(isNotHexInput)).toEqual(false);
    });
  });
});
