const h = require('react-hyperscript');

const RichText = require('../vendor/contentful-rich-text');
const renderNode = require('../common/render-node');

const Header = ({ title, slug }) => h('h2', { key: slug }, title);

const Body = ({ slug, body, Link }) =>
  h(RichText, {
    key: slug,
    richText: body,
    options: { renderNode: renderNode({ Link }) }
  });

const Page = ({ page: { title, body, slug }, Link }) =>
  h('div.page', { key: slug }, [
    h(Header, { title, slug }),
    h(Body, { slug, body, Link })
  ]);

module.exports = Page;
