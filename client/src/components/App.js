// @flow
import React from 'react';
import styles from './App.scss';
import url from '../utilities/url';
import ExportButton from './Export/ExportButton';
import ColorList from './ColorList/ColorList';
import UIFlex from '../ui-library/layout/UIFlex';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

type Props = {
  colors: [Object],
};

const MUTATION = gql`
  mutation HydateInitialLikedColors {
    hydrateInitialLikedColors @client
  }
`;

const L_KEYCODE = 76;
const D_KEYCODE = 68;

class App extends React.Component<Props> {
  componentWillMount() {
    const paletteFromUrl = url.parseColors();

    if (paletteFromUrl.length) {
      // hydrate local state from query param
    }

    // request random palette
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  getIsEventFromInput(event: KeyboardEvent) {
    const tag: string = event.target.tagName.toLowerCase();

    return tag === 'input';
  }

  handleKeydown = (event: KeyboardEvent) => {
    const keycode: number = event.which;
    const isEventFromInput = this.getIsEventFromInput(event);

    if (!isEventFromInput) {
      if (keycode === L_KEYCODE) {
        // add to palette
      } else if (keycode === D_KEYCODE) {
        // change last color in palette
      }
    }
  };

  renderTwitterButton() {
    return (
      <svg
        fill="#619fcc"
        preserveAspectRatio="xMidYMid meet"
        height="20"
        width="20"
        viewBox="0 0 40 40"
      >
        <g>
          <path d="m37.7 9.1q-1.5 2.2-3.7 3.7 0.1 0.3 0.1 1 0 2.9-0.9 5.8t-2.6 5.5-4.1 4.7-5.7 3.3-7.2 1.2q-6.1 0-11.1-3.3 0.8 0.1 1.7 0.1 5 0 9-3-2.4-0.1-4.2-1.5t-2.6-3.5q0.8 0.1 1.4 0.1 1 0 1.9-0.3-2.5-0.5-4.1-2.5t-1.7-4.6v0q1.5 0.8 3.3 0.9-1.5-1-2.4-2.6t-0.8-3.4q0-2 0.9-3.7 2.7 3.4 6.6 5.4t8.3 2.2q-0.2-0.9-0.2-1.7 0-3 2.1-5.1t5.1-2.1q3.2 0 5.3 2.3 2.4-0.5 4.6-1.7-0.8 2.5-3.2 3.9 2.1-0.2 4.2-1.1z" />
        </g>
      </svg>
    );
  }

  render() {
    return (
      <div className={styles.app}>
        <UIFlex justify="space-between" className={styles.navigationBar}>
          <UIFlex align="center">
            <a href="/">
              <h1>PALETTABLE</h1>
            </a>
            <p className="m-left-5 m-y-0" style={{ color: '#a6b4bd' }}>
              Generate beautiful color palettes using the knowledge of millions
              of designers.
            </p>
          </UIFlex>
          <UIFlex align="center">
            {this.renderTwitterButton()}
            <div className={styles.divider} />
            <ExportButton />
          </UIFlex>
        </UIFlex>
        <Mutation mutation={MUTATION}>
          {(hydrateInitialLikedColors, { data }) => {
            return <ColorList onLoad={hydrateInitialLikedColors} />;
          }}
        </Mutation>
      </div>
    );
  }
}

export default App;
