const h = require('react-hyperscript');
const { useContext } = require('react');

const { RequestContext } = require('../../contexts');

const RichText = require('../../vendor/contentful-rich-text');
const renderNode = require('../../common/render-node');

const Header = ({ title, slug }) => h('h2', { key: slug }, title);

const Body = ({ slug, body }) => {
  const { Link } = useContext(RequestContext);
  return h(RichText, {
    key: slug,
    richText: body,
    options: { renderNode: renderNode({ Link }) }
  });
};

const Page = ({ page: { title, body, slug } }) =>
  h('div.page', { key: slug }, [
    h(Header, { title, slug }),
    h(Body, { slug, body })
  ]);

module.exports = Page;
