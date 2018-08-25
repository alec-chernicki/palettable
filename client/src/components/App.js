// @flow
import React from 'react';
import styles from './App.scss';
import url from '../utilities/url';
import ExportButton from './Export/ExportButton';
import ColorList from './ColorList/ColorList';
import UIFlex from '../ui-library/layout/UIFlex';

type Props = {
  colors: [Object],
};

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
          <div>
            <ExportButton />
          </div>
        </UIFlex>
        <ColorList />
      </div>
    );
  }
}

export default App;
