// @flow
import React from 'react';
import { partial } from 'lodash';
import type { ColorType } from '../../../constants/FlowTypes';
import UIButton from '../../../UILibrary/button/UIButton';
import exportOptionsKeys from '../exportOptionsKeys';
import UITextInput from '../../../UILibrary/input/UITextCopyInput';
import url from '../../../utils/url';
import { baseUrl } from '../../../constants/links';

type Props = {
  +onSelectExportType: (key: string) => {},
  +likedColors: ColorType[],
};

const ExportContentUrl = ({ onSelectExportType }: Props) => {
  const { likedColors } = this.props;
  const stringifiedColors = url.stringifyColors(likedColors);
  const buttonStyle = {
    maxWidth: '200px',
  };

  return (
    <div>
      <p>Return to this url to continue editing your current color palette.</p>
      <UITextInput value={baseUrl(stringifiedColors)} />
      <UIButton
        style={buttonStyle}
        onClick={partial(onSelectExportType, exportOptionsKeys.UNSELECTED)}
      >
        Back to export options
      </UIButton>
    </div>
  );
};

export default ExportContentUrl;
