// @flow
import React from 'react';
import { partial } from 'lodash';
import UISelectableButton from '../../../UILibrary/button/UISelectableButton';
import FaChain from 'react-icons/lib/fa/chain';
import exportOptionsKeys from '../exportOptionsKeys';

type Props = {
  +onClick: (key: string) => {},
};

const ExportButtonUrl = ({ onClick }: Props) => {
  return (
    <UISelectableButton
      icon={FaChain}
      onClick={partial(this.handleClick, exportOptionsKeys.URL)}
    >
      URL
    </UISelectableButton>
  );
};

ExportButtonUrl.defaultProps = {
  onClick: () => {},
};

export default ExportButtonUrl;
