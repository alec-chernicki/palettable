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
import ColorSelectionFooter from './components/colors/ColorSelectionFooter';

type Props = {
  dispatchHydrateFromUrl: (ColorType[]) => void,
  dispatchRequestPalette: () => mixed,
  dispatchLikeColor: (lastColorInPalette: Object) => mixed,
  dispatchDislikeColor: (lastColorInPalette: Object) => mixed,
  lastColorInPalette: Object,
};

const L_KEYCODE = 76;
const D_KEYCODE = 68;

export class App extends React.Component<Props> {
  static defaultProps = {
    dispatchLikeColor: () => {},
    dispatchDislikeColor: () => {},
    dispatchRequestPalette: () => {},
  };

  componentDidMount() {
    const { dispatchRequestPalette, dispatchHydrateFromUrl } = this.props;
    const paletteFromUrl = url.parseColorsFromUrl();

    if (paletteFromUrl.length) {
      return dispatchHydrateFromUrl(paletteFromUrl);
    }

    dispatchRequestPalette();
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
    const {
      dispatchLikeColor,
      dispatchDislikeColor,
      lastColorInPalette,
    } = this.props;
    const keycode: number = event.which;
    const isEventFromInput = this.getIsEventFromInput(event);

    if (!isEventFromInput) {
      if (keycode === L_KEYCODE) {
        dispatchLikeColor(lastColorInPalette);
      } else if (keycode === D_KEYCODE) {
        dispatchDislikeColor(lastColorInPalette);
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
          <ColorSelectionFooter active={true} color={lastColorInPalette} />
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
    dispatchLikeColor: color => dispatch(likeColor(color)),
    dispatchDislikeColor: color => dispatch(dislikeColor(color)),
    dispatchRequestPalette: () => dispatch(requestPalette()),
    dispatchHydrateFromUrl: colors => dispatch(addLikedColors(colors)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
