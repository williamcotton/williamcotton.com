var React = require('react')
module.exports = {
  C: (name) => {
    return <span className='component-markup'>
      {'<' + name + ' />'}
    </span>
  },
  P: (path) => {
    return <span className='path-markup'>
      {path}
    </span>
  },
  F: (func) => {
    return <span className='function-markup'>
      {func}
    </span>
  },
  p: (t) => {
    return <span className='plain-markup'>
      {t}
    </span>
  }
}
