// @flow
import React from 'react';
import { partial } from 'lodash';
import type { ColorType } from '../../../constants/FlowTypes';
import UIButton from '../../../ui-library/buttons/UIButton';
import exportOptionsKeys from '../exportOptionsKeys';

type Props = {
  +onSelectExportType: (key: string) => {},
  +likedColors: ColorType[],
};

const ExportContentImage = ({ onSelectExportType }: Props) => {
  const buttonStyle = {
    maxWidth: '200px',
  };

  return (
    <div>
      <p>Your download should begin shortly.</p>
      <UIButton
        style={buttonStyle}
        onClick={partial(onSelectExportType, exportOptionsKeys.UNSELECTED)}
      >
        Back to export options
      </UIButton>
    </div>
  );
};

export default ExportContentImage;
