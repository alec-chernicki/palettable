import './Title.scss';

import React, { PropTypes } from 'react';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

const Title = ({ colors }) => (
  <InterfaceTheme color={colors[0].color}>
    <a className="title" href="/">
      <h1>PALETTABLE</h1>
    </a>
  </InterfaceTheme>
);

Title.propTypes = {
  colors: PropTypes.array.isRequired,
};

export default Title;
