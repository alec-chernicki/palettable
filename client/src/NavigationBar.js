// @flow
import * as React from 'react';
import styles from './NavigationBar.scss';
import ExportButton from '../Export/ExportButton';

type Props = {
  likedColors: Array<Object>,
};

class NavigationBar extends React.Component<Props> {
  render() {
    return (
      <div className={styles.navigationBar}>
        <a href="/">
          <h1>PALETTABLE</h1>
        </a>
        <div>
          <ExportButton />
        </div>
      </div>
    );
  }
}

export default NavigationBar;
