import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import url from './utils/url';

const mockedProps = {
  dispatchLikeColor: jest.fn(),
  dispatchDislikeColor: jest.fn(),
  dispatchRequestPalette: jest.fn(),
  dispatchHydrateFromUrl: jest.fn(),
};

describe('App', () => {
  const eventMap = {
    keydown: null,
  };

  document.addEventListener = jest.fn((event, cb) => {
    eventMap[event] = cb;
  });

  beforeEach(() => {
    shallow(<App {...mockedProps} />);
  });

  it('calls dispatchLikeColor when the keycode for L is registered on the document', () => {
    eventMap.keydown({ target: { tagName: '' }, which: 76 });

    expect(mockedProps.dispatchLikeColor).toHaveBeenCalled();
  });

  it('calls dispatchLikeColor when the keycode for D is registered on the document', () => {
    eventMap.keydown({ target: { tagName: '' }, which: 68 });

    expect(mockedProps.dispatchDislikeColor).toHaveBeenCalled();
  });

  it('calls hydrateFromUrl when url length is not 0', () => {
    jest.spyOn(url, 'parseColorsFromUrl').mockReturnValue(['#FFFFFF']);
    shallow(<App {...mockedProps} />);

    expect(mockedProps.dispatchHydrateFromUrl).toHaveBeenCalled();
  });

  it('calls requestPalette when url length is 0', () => {
    jest.spyOn(url, 'parseColorsFromUrl').mockReturnValue([]);
    shallow(<App {...mockedProps} />);

    expect(mockedProps.dispatchRequestPalette).toHaveBeenCalled();
  });
});
