import './Footer.scss';

import React, { Component } from 'react';

class Footer extends Component {
  handleTweet() {
    const text = 'Check out this great color palette I made with Palettable, made by @whynotdostuff.';
    const url = window.location.href;
    open(
      `http://twitter.com/intent/tweet?text=${text}&url=${url}`,
      'thsare',
      'height=400,width=550,resizable=1, toolbar=0,menubar=0,status=0, location=0'
    );
  }
  handleRestartTutorial() {
  }
  render() {
    return (
      <footer>
        <a className="footer-icon twitter" onClick={this.handleTweet} />
        <a className="footer-icon github" href="https://github.com/alecortega/palettable" />
        <a className="tutorial" onClick={this.props.onStartTutorial}>Tutorial</a>
        <p className="footer-text">
          Made By
          <a href="http://www.alecortega.com/" className="footer-name">
            &nbsp;Alec Ortega
          </a>
        </p>
      </footer>
    );
  }
}

export default Footer;
