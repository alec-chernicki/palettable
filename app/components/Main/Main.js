import './Main.scss';

import React, { PropTypes } from 'react';
import Title from '../Title/Title';
import ColorList from '../ColorList/ColorList';
import VisibleOnboarding from '../../containers/VisibleOnboarding';
import FooterContainer from '../../containers/FooterContainer';
import ExportContainer from '../../containers/ExportContainer';

const Main = ({ colors, isFetching, onboarding }) => {
  if (colors.length === 0) {
    return (
      <div className="loading-container">
        <h1 className="loading">Loading</h1>
      </div>
    );
  }
  const userAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = userAgentRegex.test(navigator.userAgent);
  // TODO: Can add classnames module to clean this up a bit
  return (
    <div className={isMobile ? 'is-mobile root-container' : 'root-container'}>
      <div className={!onboarding.isCompleted && 'onboarding-active'}>
        <div className="mobile-notice">
          <h1>Uh, oh.</h1>
          <p>
            Palettable isn't available on mobile devices...yet!
            Please, visit palettable.io on your desktop browser.
          </p>
          <p>For updates:</p>
          <a
            className="twitter-follow-button"
            href="https://twitter.com/whynotdostuff"
          >
            Follow @whynotdostuff
          </a>
        </div>
        <Title colors={colors} />
        <ExportContainer colors={colors} />
        <VisibleOnboarding />
        <div className="main-container">
          <ColorList colors={colors} isFetching={isFetching} />
          <FooterContainer />
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  colors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboarding: PropTypes.object.isRequired,
};

export default Main;
