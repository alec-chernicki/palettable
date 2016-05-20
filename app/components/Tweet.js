import React, { Component, PropTypes } from 'react'
import InterfaceTheme from './InterfaceTheme'

class Tweet extends Component {
  handleClick () {
    let text = 'Check out this search engine for color palettes made by @whynotdostuff: '
    let url = 'http://palettable.alecortega.com'

    open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url, 'tshare',
     'height=400,width=550,resizable=1, toolbar=0,menubar=0,status=0, location=0')
  }
  render () {
    return (
      <InterfaceTheme color={this.props.colors[0].color}>
        <a className='tweet' onClick={this.handleClick.bind(this)}>
          TWEET
        </a>
      </InterfaceTheme>
    )
  }
}

Tweet.propTypes = {
  colors: PropTypes.array.isRequired
}

export default Tweet
