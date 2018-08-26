// @flow
import styles from './ColorList.scss';
import React from 'react';
import Loader from 'react-loader-spinner';
import ColorItem from '../../components/ColorItem/ColorItem';
import getInterfaceAttributes from '../../utilities/getInterfaceAttributes';
import UIButton from '../../ui-library/buttons/UIButton';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUERY = gql`
  {
    palette {
      colors {
        id
        hexCode
      }
    }
    likedColors @client {
      id
      hexCode
    }
  }
`;

type Props = {
  +likedColors: Array<Object>,
  +requestPalette: () => mixed,
  +hasFetchFailed: boolean,
};

class ColorList extends React.Component<Props> {
  static defaultProps = {
    onLoad: () => {},
  };

  handleOnComplete = data => {
    const { onLoad } = this.props;

    if (data.likedColors.length !== 0) {
      return;
    }

    onLoad();
  };

  renderError() {
    return (
      <div className={styles.loaderContainer}>
        <div>
          <h1>Well, this is embarassing.</h1>
          <p>Unfortunately we weren't able to get suggested palettes.</p>
          <UIButton use="positive" href="/">
            Refresh the page
          </UIButton>
        </div>
      </div>
    );
  }

  renderLoader() {
    const interfaceAttributes = getInterfaceAttributes('#222');
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <Loader type="line-scale" color={interfaceAttributes.color} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Query query={QUERY} onCompleted={this.handleOnComplete}>
        {({ loading, error, data }) => {
          if (loading) return this.renderLoader();
          if (error) return this.renderError();

          if (data.likedColors.length === 0) {
            return null;
          }

          return (
            <TransitionGroup className={styles.colorList}>
              {data.likedColors.map((color, index) => {
                return (
                  <CSSTransition
                    key={index}
                    className={styles.flexItemWrapper}
                    timeout={400}
                    classNames={{
                      enter: styles.flexEnter,
                      enterActive: styles.flexEnterActive,
                      exit: styles.flexExit,
                      exitActive: styles.flexExitActive,
                    }}
                  >
                    <ColorItem color={color} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          );
        }}
      </Query>
    );
  }
}

export default ColorList;
