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

const QUERY = gql`
  {
    palette {
      colors {
        hexCode
      }
    }
  }
`;
const IMAGE_ENDPOINT = 'http://localhost:4000/api/image';

type Props = {
  +likedColors: ColorType[],
  +onClick: (key: string) => {},
};

class ExportButtonImage extends React.Component<Props> {
  handleClick = (colors, e) => {
    const { onClick } = this.props;
    const stringifiedColors = url.stringifyColors(colors);

    download(`${IMAGE_ENDPOINT}/${stringifiedColors}.png`);
    onClick(exportOptionsKeys.IMAGE);
  };

  render() {
    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
          const { colors } = data.palette;
          debugger;
          const stringifiedColors = url.stringifyColors(colors);

          return (
            <UISelectableButton
              icon={FaImage}
              href={`${IMAGE_ENDPOINT}/${stringifiedColors}`}
              onClick={partial(this.handleClick, colors)}
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
