// @flow
import React from 'react';
import UISelectableButton from '../../../ui-library/buttons/UISelectableButton';
import { FaImage } from 'react-icons/fa';
import type { ColorType } from '../../../constants/FlowTypes';
import url from '../../../utilities/url';
import download from 'downloadjs';
import exportOptionsKeys from '../exportOptionsKeys';

const IMAGE_ENDPOINT = '/api/image';

type Props = {
  +likedColors: ColorType[],
  +onClick: (key: string) => {},
};

class ExportButtonImage extends React.Component<Props> {
  handleClick = e => {
    e.preventDefault();
    const { likedColors, onClick } = this.props;
    const stringifiedColors = url.stringifyColors(likedColors);

    download(`${IMAGE_ENDPOINT}/${stringifiedColors}.png`);
    onClick(exportOptionsKeys.IMAGE);
  };

  render() {
    const { likedColors } = this.props;
    const stringifiedColors = url.stringifyColors(likedColors);

    return (
      <UISelectableButton
        icon={FaImage}
        href={`${IMAGE_ENDPOINT}/${stringifiedColors}`}
        onClick={this.handleClick}
      >
        PNG
      </UISelectableButton>
    );
  }
}

export default ExportButtonImage;
