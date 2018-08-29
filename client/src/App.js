// @flow
import styles from './App.scss';
import * as React from 'react';
import NavigationBar from './components/navigation/NavigationBar';
import { connect } from 'react-redux';
import { dislikeColor } from './redux/actions/dislikedColors';
import { likeColor } from './redux/actions/likedColors';
import ColorList from './components/colors/ColorList';
import { requestPalette } from './redux/actions/suggestedColors';
import { addLikedColors } from './redux/actions/likedColors';
import lastColorInPaletteSelector from './redux/selectors/lastColorInPaletteSelector';
import url from './utils/url';
import type { ColorType } from './constants/FlowTypes';
import ColorListItemFooter from './components/colors/ColorListItemFooter';

type Props = {
  hydrateFromUrl: (ColorType[]) => void,
  requestRandomPalette: () => mixed,
  onLike: (lastColorInPalette: Object) => mixed,
  onDislike: (lastColorInPalette: Object) => mixed,
  lastColorInPalette: Object,
};

const L_KEYCODE = 76;
const D_KEYCODE = 68;

class App extends React.Component<Props> {
  componentDidMount() {
    const { requestRandomPalette, hydrateFromUrl } = this.props;
    const paletteFromUrl = url.parseColors();

    if (paletteFromUrl.length) {
      return hydrateFromUrl(paletteFromUrl);
    }

    requestRandomPalette();
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  getIsEventFromInput(event: KeyboardEvent) {
    const tag: string = event.target.tagName.toLowerCase();

    return tag === 'input';
  }

  handleKeydown = (event: KeyboardEvent) => {
    const { onLike, onDislike, lastColorInPalette } = this.props;
    const keycode: number = event.which;
    const isEventFromInput = this.getIsEventFromInput(event);

    if (!isEventFromInput) {
      if (keycode === L_KEYCODE) {
        onLike(lastColorInPalette);
      } else if (keycode === D_KEYCODE) {
        onDislike(lastColorInPalette);
      }
    }
  };

  render() {
    const { lastColorInPalette } = this.props;

    return (
      <div className={styles.app}>
        <NavigationBar />
        <ColorList />
        <div className={styles.footer}>
          <ColorListItemFooter active={true} color={lastColorInPalette} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastColorInPalette: lastColorInPaletteSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLike: color => dispatch(likeColor(color)),
    onDislike: color => dispatch(dislikeColor(color)),
    requestRandomPalette: () => dispatch(requestPalette()),
    hydrateFromUrl: colors => dispatch(addLikedColors(colors)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
