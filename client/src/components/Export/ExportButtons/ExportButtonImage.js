// @flow
import React from 'react';
import { partial } from 'underscore';
import UISelectableButton from '../../../ui-library/buttons/UISelectableButton';
import { FaImage } from 'react-icons/fa';
import type { ColorType } from '../../../constants/FlowTypes';
import url from '../../../utilities/url';
import download from 'downloadjs';
import exportOptionsKeys from '../exportOptionsKeys';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import getServerUrl from '../../../utilities/getServerUrl';

const QUERY = gql`
  {
    likedColors {
      hexCode
    }
  }
`;
const IMAGE_ENDPOINT = `${getServerUrl()}/api/image`;

type Props = {
  +likedColors: ColorType[],
  +onClick: (key: string) => {},
};

class ExportButtonImage extends React.Component<Props> {
  handleClick = (likedColors, e) => {
    const { onClick } = this.props;
    const stringifiedColors = url.stringifyColors(likedColors);

    download(`${IMAGE_ENDPOINT}/${stringifiedColors}.png`);
    onClick(exportOptionsKeys.IMAGE);
  };

  render() {
    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
          return (
            <UISelectableButton
              icon={FaImage}
              onClick={partial(this.handleClick, data.likedColors)}
            >
              PNG
            </UISelectableButton>
          );
        }}
      </Query>
    );
  }
}

export default ExportButtonImage;
