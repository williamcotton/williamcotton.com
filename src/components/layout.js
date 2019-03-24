const h = require('react-hyperscript');

module.exports = ({ content, Link }) =>
  // prettier-ignore
  h('div.sitewrapper', [
    h('header', [
      h('h1', [
        h(Link, { href: '/' }, 'williamcotton.com'),
      ]),
    ]),
    h('div.content', [
      content,
    ]), 
    h('footer', [
      h('pre', [])
    ]),
  ]);
