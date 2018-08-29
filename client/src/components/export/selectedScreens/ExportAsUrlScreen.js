// @flow
import React from 'react';
import type { ColorType } from '../../../constants/FlowTypes';
import UIButton from '../../shared/button/UIButton';
import exportOptionsKeys from '../exportOptionsKeys';
import UITextCopyInput from '../../shared/input/UITextCopyInput';
import url from '../../../utils/url';
import { baseUrl } from '../../../constants/links';

type Props = {
  +onSelectExportType: (key: string) => {},
  +likedColors: ColorType[],
};

class ExportContentUrl extends React.Component<Props> {
  handleClick = () => {
    const { onSelectExportType } = this.props;

    onSelectExportType(exportOptionsKeys.UNSELECTED);
  };

  render() {
    const { likedColors } = this.props;
    const stringifiedColors = url.stringifyColors(likedColors);
    const linkableUrl = baseUrl(stringifiedColors);
    const buttonStyle = {
      maxWidth: '200px',
    };

    return (
      <div>
        <p>
          Return to this url to continue editing your current color palette.
        </p>
        <UITextCopyInput value={linkableUrl} />
        <UIButton style={buttonStyle} onClick={this.handleClick}>
          Back to export options
        </UIButton>
      </div>
    );
  }
}

export default ExportContentUrl;
