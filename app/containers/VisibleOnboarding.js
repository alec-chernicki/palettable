import { connect } from 'react-redux';
import Onboarding from '../components/Onboarding/Onboarding';

const mapStateToProps = (state) => {
  const {
    shownPalette: { colors },
    onboarding: { step, isCompleted },
  } = state;

  return {
    step,
    isCompleted,
    color: colors[colors.length - 1].color,
  };
};

const SyncedColor = connect(
  mapStateToProps
)(Onboarding);

export default SyncedColor;
