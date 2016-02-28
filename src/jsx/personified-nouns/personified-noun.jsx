'use strict'
var React = require('react')
class PersonifiedNoun extends React.Component {
  render () {
    return <div className='personified-noun'>
     <h2>{this.props.title}</h2>
      {this.props.children}
    </div>
  }
}

PersonifiedNoun.PN = class PersonifiedNoun extends React.Component {
  render () {
    var link = '/' + this.props.children.toLowerCase().replace(' ', '-')
    return <a className='personified-noun-link' href={link}>{this.props.children}</a>
  }
}

module.exports = PersonifiedNoun
