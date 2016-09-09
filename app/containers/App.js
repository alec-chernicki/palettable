import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import {
  addColorIfValid, removeColorIfValid, changeColorIfValid, animateColorStatus, addColor,
  loadPaletteFromURLIfValid,
} from '../actions';

class App extends Component {
  componentWillMount() {
    const { dispatch, params: {palette} } = this.props;

    dispatch(loadPaletteFromURLIfValid(palette));

    localStorage.setItem('onboardingCompletedPreviously', true);

    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.onkeydown = this.suppressBackspace.bind(this);
    document.onkeypress = this.suppressBackspace.bind(this);
  }
  suppressBackspace(e) {
    const event = e || window.event;
    const target = event.target || event.srcElement;

    if (event.keyCode === 8 && !/input|textarea/i.test(target.nodeName)) {
      return false;
    }
    return true;
  }
  handleKeydown(e) {
    const { isFetching, dispatch, colors } = this.props;
    const tag = e.target.tagName.toLowerCase();

    if (!isFetching && tag !== 'input') {
      if (e.which === 76) {
        dispatch(addColorIfValid());
      } else if (e.which === 68) {
        dispatch(changeColorIfValid());
      } else if (e.which === 8) {
        dispatch(removeColorIfValid());
      }
    }
  }
  renderErrorIfValid() {
    return (
      <div className="fullscreen-notice">
        <div className="fullscreen-notice-inner">
          <h1>
            PALETTABLE
          </h1>
          <p>
            This application depends on the API from
            <a
              href="http://www.colourlovers.com/"
              target="_blank"
            >
              &nbsp;colourlovers.com
            </a>
            .&nbsp;Unforutunately their API is down for maintenance and Palettable will be down as well
            until they are back up again. I know, I'm pretty sad about it too, but we'll hopefully be
            back soon. For more status updates:
          </p>
          <a
            className="twitter-follow-button"
            href="https://twitter.com/whynotdostuff"
          >
            Follow @whynotdostuff
          </a>
        </div>
      </div>
    )
  }
  render() {
    const { colors, isFetching, fetchFailed, onboarding } = this.props;
  
    if (!fetchFailed) {
      return (
        <Main
          colors={colors}
          isFetching={isFetching}
          onboarding={onboarding}
        />
      );
    }
    else {
      return (
        this.renderErrorIfValid()
      )
    }
  }
}

App.propTypes = {
  colors: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onboarding: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { onboarding, shownPalette, fetchedPalette } = state;

  return {
    colors: shownPalette.colors,
    onboarding,
    fetchFailed: fetchedPalette.fetchFailed,
    isFetching: fetchedPalette.isFetching,
  };
};

export default connect(mapStateToProps)(App);
