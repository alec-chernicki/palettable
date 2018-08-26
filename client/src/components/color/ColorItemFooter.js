// @flow
import { partial } from 'underscore';
import styles from './ColorItemFooter.scss';
import type { ColorType } from '../../constants/FlowTypes';
import React from 'react';
import classNames from 'classnames';
import UIButton from '../../ui-library/buttons/UIButton';
import ExportButton from '../Export/ExportButton';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const QUERY = gql`
  {
    likedColors @client {
      id
    }
  }
`;

const LIKE_COLOR_MUTATION = gql`
  mutation LikeColor($id: ID!) {
    likeColor(id: $id) @client {
      id
    }
  }
`;

const DISLIKE_COLOR_MUTATION = gql`
  mutation DislikeColor($id: ID!) {
    dislikeColor(id: $id) @client {
      id
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

  renderDislikeButton() {
    const { color } = this.props;

    return (
      <Mutation mutation={DISLIKE_COLOR_MUTATION}>
        {(dislikeColor, { data }) => {
          return (
            <UIButton
              use="negative"
              className={styles.buttonDislike}
              onClick={partial(dislikeColor, {
                variables: { id: color.id },
              })}
            >
              Dislike
            </UIButton>
          );
        }}
      </Mutation>
    );
  }

  render() {
    const { color } = this.props;

    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
          const { likedColors } = data;
          const isLastColor =
            !!likedColors.length &&
            likedColors[likedColors.length - 1].id === color.id;
          const isAtMaximum = likedColors.length === 5;
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
                {isAtMaximum ? (
                  this.renderExportButton()
                ) : (
                  <Mutation mutation={LIKE_COLOR_MUTATION}>
                    {(likeColor, { data }) => {
                      return (
                        <UIButton
                          use="positive"
                          onClick={partial(likeColor, {
                            variables: { id: color.id },
                          })}
                        >
                          Like
                        </UIButton>
                      );
                    }}
                  </Mutation>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ColorItemFooter;
