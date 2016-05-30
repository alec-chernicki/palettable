import './Main.scss';

import React, { PropTypes } from 'react';
import Title from '../Title/Title';
import Footer from '../Footer/Footer';
import ColorList from '../ColorList/ColorList';
import Onboarding from '../Onboarding/Onboarding';

const Main = ({ colors, isFetching, onboardingStep }) => {
  if (colors.length === 0) {
    return (
      <div className="loading-cotainer">
        <h1 className="loading">Loading</h1>
      </div>
    );
  }
  return (
    <div className={onboardingStep <= 3 && 'onboarding-active'}>
      <div className="on-mobile">
        <p>
          Unfortunately Palettable isn't compatible on mobile devices...yet!
          Please, visit palettable.io on your desktop browser.
        </p>
      </div>
      <Title colors={colors} />
      <Onboarding colors={colors} onboardingStep={onboardingStep} />
      <div className="main-container">
        <ColorList colors={colors} isFetching={isFetching} />
        <Footer />
      </div>
    </div>
  );
};

Main.propTypes = {
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboardingStep: PropTypes.number.isRequired,
};

export default Main;
