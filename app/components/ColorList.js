import React, { PropTypes } from 'react';
import axios from 'axios'
import Color from './Color';

class ColorList extends React.Component {
  constructor(props) {
    super(props);
    let randomColor;
    axios.get('https://colourlovers.com/api/colors/random', {
      format: 'json'
    })
      .then((data) => {
        console.log(data)
        randomColor = '#' + data[0].hex;
      });
    this.state = {
      colors: [randomColor]
    }
  }
  handleKeyPress(e) {
    // Like
    if (e.keyCode === 65) {

    }
    // Dislike
    else if (e.keyCode === 76) {

    }
    // Remove Color
    else if (e.keyCode === 8) {
      e.preventDefault();
      let colors = this.state.colors;
      let newColors = colors.splice(0, colors.length - 1);

      this.setState({colors: newColors});
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }
  render () {
    let colors = this.state.colors.map((color) => {
      return (
        <li key={Date.now()} style={{backgroundColor: color}} className='color'>
          <Color colorCode={color} />
        </li>
      );
    });
    return (
      <div>
        <ul className='color-list'>
          {colors}
        </ul>
      </div>
    )
  }
}

export default ColorList;
