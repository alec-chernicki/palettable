import React from 'react'

class Footer extends React.Component {
  handleClick () {
    let text = 'Check out this search engine for color palettes made by @whynotdostuff: '
    let url = 'http://palettable.alecortega.com'

    open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url, 'tshare',
     'height=400,width=550,resizable=1, toolbar=0,menubar=0,status=0, location=0')
  }
  render () {
    return (
      <footer>
        <a className='footer-icon twitter' onClick={this.handleClick.bind(this)} />
        <a className='footer-icon github' href='https://github.com/alecortega' />
        <p className='footer-text'>
          Made By
          <a href='http://www.alecortega.com/' className='footer-name'>
            Alec Ortega
          </a>
        </p>
      </footer>
    )
  }
}

export default Footer
