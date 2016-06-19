import { connect } from 'react-redux';
import Footer from '../components/Footer/Footer';
import { restartOnboardingAndUpdate } from '../actions';
import { updateURLWith } from '../../utils/helpers';

const mapDispatchToProps = (dispatch) => ({
  onStartTutorial() {
    dispatch(restartOnboardingAndUpdate());
  },
});

const FooterContainer = connect(
  null,
  mapDispatchToProps
)(Footer);

export default FooterContainer;
