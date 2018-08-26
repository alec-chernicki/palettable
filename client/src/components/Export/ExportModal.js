// @flow
import styles from './ExportModal.scss';
import Modal from 'react-modal';
import React from 'react';
import exportOptionsConfig from './exportOptionsConfig';
import exportOptionsKeys from './exportOptionsKeys';
import Icon from 'react-icons-kit';
import { closeRound } from 'react-icons-kit/ionicons/closeRound';
import UIFlex from '../../ui-library/layout/UIFlex';
import type { ColorType } from '../../constants/FlowTypes';

type Props = {
  +likedColors: ColorType[],
  +isOpen: boolean,
  +onClose: () => {},
  +styles: Object,
};

type State = {
  selectedExportOption: string,
};

class ExportModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedExportOption: exportOptionsKeys.UNSELECTED,
    };
  }

  handleExportOptionClick = exportOptionsKey => {
    this.setState({ selectedExportOption: exportOptionsKey });
  };

  renderExportOptionButtons() {
    return Object.keys(exportOptionsConfig).map((exportOptionKey, index) => {
      const { ButtonComponent } = exportOptionsConfig[exportOptionKey];

      return (
        <ButtonComponent key={index} onClick={this.handleExportOptionClick} />
      );
    });
  }

  renderExportOptionsContent() {
    const { selectedExportOption } = this.state;
    const { likedColors } = this.props;
    const { ContentComponent } = exportOptionsConfig[selectedExportOption];

    return (
      <ContentComponent
        likedColors={likedColors}
        onSelectExportType={this.handleExportOptionClick}
      />
    );
  }

  renderExportOptions() {
    const { selectedExportOption } = this.state;

    if (selectedExportOption === exportOptionsKeys.UNSELECTED) {
      return (
        <UIFlex
          justify="space-between"
          className="m-x-auto"
          style={{ maxWidth: '350px' }}
        >
          {this.renderExportOptionButtons()}
        </UIFlex>
      );
    }

    return this.renderExportOptionsContent();
  }

  render() {
    const { onClose } = this.props;

    return (
      <Modal
        isOpen={true}
        closeTimeoutMS={200}
        className={styles.exportModalContainer}
        overlayClassName={styles.exportModalOverlay}
      >
        <div className={styles.exportModal}>
          <div className={styles.exportModalHeader}>
            <h2 className={styles.exportModalTitle}>
              How would you like to export your palette?
            </h2>
            <a className={styles.closeButton} onClick={onClose}>
              <Icon icon={closeRound} size={25} />
            </a>
          </div>
          <div className="p-all-6">{this.renderExportOptions()}</div>
        </div>
      </Modal>
    );
  }
}

export default ExportModal;
