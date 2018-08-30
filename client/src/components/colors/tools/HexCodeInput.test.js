import React from 'react';
import { shallow } from 'enzyme';
import { HexCodeInput } from './HexCodeInput';

const componentCssSelector = '[data-jest="hexCodeInput"]';
const mockedProps = {
  dispatchChangeLikedColor: jest.fn(),
  color: { hexCode: '#FFF' },
};
const validInputs = ['000', '#000', '#FFFFFF'];
const invalidInputs = ['hello', '0', '#hello', '0000000'];

describe('HexCodeInput', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<HexCodeInput {...mockedProps} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  validInputs.forEach(validInput => {
    it(`calls dispatchChangeLikedColor for input ${validInput}`, () => {
      rendered.simulate('focus');
      rendered.simulate('change', { target: { value: validInput } });
      rendered.simulate('blur', { target: { value: validInput } });

      expect(mockedProps.dispatchChangeLikedColor).toHaveBeenCalled();
    });
  });

  invalidInputs.forEach(invalidInput => {
    it(`not not call dispatchChangeLikedColor for input ${invalidInput}`, () => {
      rendered.simulate('focus');
      rendered.simulate('change', { target: { value: invalidInput } });
      rendered.simulate('blur', { target: { value: invalidInput } });

      expect(mockedProps.dispatchChangeLikedColor).not.toHaveBeenCalled();
    });
  });
});
