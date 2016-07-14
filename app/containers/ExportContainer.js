import { connect } from 'react-redux';
import Export from '../components/Export/Export';
import {
    exportPaletteIfValid,
} from '../actions';

const mapDispatchToProps = (dispatch) => ({
    onExport() {
        dispatch(exportPaletteIfValid());
    },
});

const ExportContainer = connect(
    null,
    mapDispatchToProps
)(Export);

export default ExportContainer;
