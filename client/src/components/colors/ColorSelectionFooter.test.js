import React from 'react';
import { shallow } from 'enzyme';
import { ColorSelectionFooter } from './ColorSelectionFooter';

const mockedProps = {
  dispatchLikeColor: jest.fn(),
  dispatchDislikeColor: jest.fn(),
  isAtMaximum: false,
};

describe('ColorSelectionFooter', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<ColorSelectionFooter {...mockedProps} />);
  });

  it('calls dispatchLikeColor when like button is clicked', () => {
    rendered.find('[data-jest="likeButton"]').simulate('click');

    expect(mockedProps.dispatchLikeColor).toHaveBeenCalled();
  });

  it('calls dispatchDisikeColor when like button is clicked', () => {
    rendered.find('[data-jest="dislikeButton"]').simulate('click');

    expect(mockedProps.dispatchDislikeColor).toHaveBeenCalled();
  });

  it('renders the export button when isAtMaximum is true', () => {
    const newProps = {
      ...mockedProps,
      isAtMaximum: true,
    };
    rendered = shallow(<ColorSelectionFooter {...newProps} />);

    const doesExist = !!rendered.find('[data-jest="dislikeButton"]').length;

    expect(doesExist).toEqual(true);
  });
});
