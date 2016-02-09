'use strict'
var React = require('react')
module.exports = class Article extends React.Component {
  render () {
    return <div className='article'>
     <h2>{this.props.title}</h2>
      {this.props.children}
    </div>
  }
}
