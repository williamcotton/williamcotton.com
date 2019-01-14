const h = require('react-hyperscript');
const figlet = require('figlet');

const emailAddress = figlet.textSync('williamcotton@gmail.com', { font: 'small' });

module.exports = ({ content }) =>
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
      h('pre', [emailAddress])
    ]),
  ]);
