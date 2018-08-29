// @flow
import { partial } from 'lodash';
import React from 'react';
import ExportModal from './ExportModal';
import UIButton from '../shared/button/UIButton';

type Props = {};

type State = {
  isExportModalOpen: boolean,
};

class ExportButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isExportModalOpen: false,
    };
  }

  setIsExportModalOpen = (isExportModalOpen: boolean) => {
    this.setState({ isExportModalOpen });
  };

  renderExportModal() {
    const { isExportModalOpen } = this.state;

    if (!isExportModalOpen) {
      return null;
    }

    return (
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={partial(this.setIsExportModalOpen, false)}
      />
    );
  }

  render() {
    return (
      <div>
        <UIButton onClick={partial(this.setIsExportModalOpen, true)}>
          Export
        </UIButton>
        {this.renderExportModal()}
      </div>
    );
  }
}

export default ExportButton;
