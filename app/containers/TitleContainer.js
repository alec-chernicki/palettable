import { connect } from 'react-redux';
import Title from '../components/Title/Title';

const flattenedColors = (colors) => (
  colors.map(color => color.color)
);

const mapStateToProps = (state) => ({
  firstColor: state.shownPalette.colors[0].color,
  colorString: flattenedColors(state.shownPalette.colors),
});

const t = connect(
  mapStateToProps
)(Title);

export default TitleContainer;
