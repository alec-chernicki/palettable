// @flow
import { partial } from 'lodash';
import React from 'react';
import ExportModal from './ExportModal';
import UIButton from '../../ui-library/buttons/UIButton';

type Props = {};

type State = {
  isModalOpen: boolean,
};

class ExportButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  setisModalOpen = (isModalOpen: boolean) => {
    this.setState({ isModalOpen });
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <div>
        <UIButton onClick={partial(this.setisModalOpen, true)}>Export</UIButton>
        {isModalOpen && (
          <ExportModal
            isOpen={isModalOpen}
            onClose={partial(this.setisModalOpen, false)}
          />
        )}
      </div>
    );
  }
}

export default ExportButton;
