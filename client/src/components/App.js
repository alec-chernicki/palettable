// @flow
import React from 'react';
import styles from './App.scss';
import url from '../utilities/url';
import ExportButton from './Export/ExportButton';

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
    const { children } = this.props;

    return (
      <div className={styles.app}>
        <div className={styles.navigationBar}>
          <a href="/">
            <h1>PALETTABLE</h1>
          </a>
          <div>
            <ExportButton />
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default App;
