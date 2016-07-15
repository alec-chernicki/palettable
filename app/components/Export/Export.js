import './Export.scss';

import React, { PropTypes, Component } from 'react';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

class Export extends Component {
    render() {
        const {
            onExport, colors,
        } = this.props;
        return (
            <InterfaceTheme color={colors[0].color}>
                <a className="export" href="#" onClick={onExport}>
                    export to csv
                </a>
            </InterfaceTheme>
        );
    }
}

Export.propTypes = {
  colors: PropTypes.array.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default Export;
