const h = require('react-hyperscript');
const RichText = require('../vendor/contentful-rich-text');

module.exports = ({ title, body }) =>
  // prettier-ignore
  h('article', [
    h('h2', title), 
    h(RichText, { richText: body }),
  ]);
