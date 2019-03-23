const h = require('react-hyperscript');

module.exports = ({ content, emailAddress }) =>
  // prettier-ignore
  h('div.sitewrapper', [
    h('header', [
      h('h1', [
        h('a', { href: '/'}, 'williamcotton.com'),
      ]),
    ]),
    h('div.content', [
      content,
    ]), 
    h('footer', [
      h('pre', emailAddress)
    ]),
  ]);
