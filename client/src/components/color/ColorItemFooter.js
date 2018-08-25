// @flow
import styles from './ColorItemFooter.scss';
import type { ColorType } from '../../constants/FlowTypes';
import React from 'react';
import classNames from 'classnames';
import UIButton from '../../ui-library/buttons/UIButton';
import ExportButton from '../Export/ExportButton';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUERY = gql`
  {
    palette {
      colors {
        id
      }
    }
  }
`;

type Props = {
  +onLike: () => {},
  +onDislike: () => {},
  +color: ColorType,
};

class ColorItemFooter extends React.Component<Props> {
  static defaultProps = {
    isLastItem: false,
    isAtMaximum: false,
  };

  renderExportButton() {
    return <ExportButton />;
  }

  renderLikeButton() {
    const { onLike } = this.props;

    return (
      <UIButton use="positive" onClick={onLike}>
        Like
      </UIButton>
    );
  }

  renderDislikeButton() {
    const { onDislike } = this.props;

    return (
      <UIButton
        use="negative"
        className={styles.buttonDislike}
        onClick={onDislike}
      >
        Dislike
      </UIButton>
    );
  }

  render() {
    const { color } = this.props;

    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
          const { colors } = data.palette;
          const isLastColor = colors[colors.length - 1].id === color.id;
          const isAtMaximum = colors.length === 5;
          const className = classNames(styles.colorFooter, {
            [styles.active]: isLastColor,
            [styles.inactive]: !isLastColor,
          });

          return (
            <div className={className}>
              {isAtMaximum && (
                <p className={styles.message}>Maximum of 5 colors</p>
              )}
              <div className={styles.buttons}>
                {this.renderDislikeButton()}
                {isAtMaximum
                  ? this.renderExportButton()
                  : this.renderLikeButton()}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ColorItemFooter;
