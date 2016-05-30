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
  // TODO: Can add classnames module to clean this up a bit
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  return (
    <div className={isMobile ? 'is-mobile root-container' : 'root-container'}>
      <div className={onboardingStep <= 3 && 'onboarding-active'}>
        <div className="mobile-notice">
          <h1>Uh, oh.</h1>
          <p>
            Palettable isn't available on mobile devices...yet!
            Please, visit palettable.io on your desktop browser.
          </p>
          <p>Follow for updates:</p>
          <a
            className="twitter-follow-button"
            href="https://twitter.com/whynotdostuff"
          >
            Follow @whynotdostuff
          </a>
        </div>
        <Title colors={colors} />
        <Onboarding colors={colors} onboardingStep={onboardingStep} />
        <div className="main-container">
          <ColorList colors={colors} isFetching={isFetching} />
          <Footer />
        </div>
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
