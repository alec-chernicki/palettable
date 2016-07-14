import './Export.scss';

import React, { PropTypes } from 'react';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

const Export = ({ colors }) => (
  <InterfaceTheme color={colors[0].color}>
    <a className="export" href="#">
      export
    </a>
  </InterfaceTheme>
);

Export.propTypes = {
  colors: PropTypes.array.isRequired,
};

export default Export;
