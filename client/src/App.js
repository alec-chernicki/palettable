// @flow
import React from 'react';
import url from '../../utils/url';

type Props = {
  colors: [Object],
};

class App extends React.Component<Props> {
  componentDidMount() {
    const { requestRandomPalette, hydrateFromUrl } = this.props;
    const paletteFromUrl = url.parseColors();

    if (paletteFromUrl.length) {
      return hydrateFromUrl(paletteFromUrl);
    }

    requestRandomPalette();
  }

  suppressBackspace = e => {
    const event = e || window.event;
    const target = event.target || event.srcElement;

    if (event.keyCode === 8 && !/input|textarea/i.test(target.nodeName)) {
      return false;
    }
    return true;
  };

  render() {
    const { colors, isFetching } = this.props;

    return (
      <div>
        <Title colors={colors} />
        <VisibleOnboarding />
        <div className="main-container">
          <ColorList colors={colors} isFetching={isFetching} />
          <FooterContainer />
        </div>
      </div>
    );
  }
}

export default App;
