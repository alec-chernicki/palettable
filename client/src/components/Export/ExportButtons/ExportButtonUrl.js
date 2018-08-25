// @flow
import React from 'react';
import { partial } from 'underscore';
import UISelectableButton from '../../../ui-library/buttons/UISelectableButton';
import { FaLink } from 'react-icons/fa';
import exportOptionsKeys from '../exportOptionsKeys';

type Props = {
  +onClick: (key: string) => {},
};

const ExportButtonUrl = ({ onClick }: Props) => {
  return (
    <UISelectableButton
      icon={FaLink}
      onClick={partial(onClick, exportOptionsKeys.URL)}
    >
      URL
    </UISelectableButton>
  );
};

ExportButtonUrl.defaultProps = {
  onClick: () => {},
};

export default ExportButtonUrl;
