// @flow
import styles from './ExportModal.scss';
import Modal from 'react-modal';
import React from 'react';
import type { ColorType, ReduxStore } from '../../constants/FlowTypes';
import likedColorsSelector from '../../redux/selectors/likedColorsSelector';
import { connect } from 'react-redux';
import exportOptionsConfig from './exportOptionsConfig';
import exportOptionsKeys from './exportOptionsKeys';
import Icon from 'react-icons-kit';
import { closeRound } from 'react-icons-kit/ionicons/closeRound';

type Props = {
  +likedColors: ColorType[],
  +isOpen: boolean,
  +onClose: () => {},
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
        <ButtonComponent
          key={index}
          className={styles.exportButton}
          onClick={this.handleExportOptionClick}
        />
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
        <div className={styles.exportButtons}>
          {this.renderExportOptionButtons()}
        </div>
      );
    }

    return this.renderExportOptionsContent();
  }

  render() {
    const { onClose } = this.props;

    return (
      <Modal
        isOpen={true}
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
          <div className={styles.exportModalContent}>
            {this.renderExportOptions()}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: ReduxStore) => {
  return {
    likedColors: likedColorsSelector(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(ExportModal);
