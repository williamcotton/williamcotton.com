const h = require('react-hyperscript');
const RichText = require('./contentful-rich-text');

module.exports = ({ title, body }) => h([h('h2', title), h(RichText, { richText: body })]);
