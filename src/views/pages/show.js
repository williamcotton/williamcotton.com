const h = require('react-hyperscript');
const { useContext } = require('react');
const {
  documentToReactComponents,
} = require('@contentful/rich-text-react-renderer');

const { RequestContext } = require('../../contexts');
const renderNode = require('../../common/render-node');

const RichText = ({ richText, options }) =>
  documentToReactComponents(richText, options);

const Header = ({ title, slug }) => h('h2', { key: slug }, title);

const Body = ({ slug, body }) => {
  const { Link, p } = useContext(RequestContext);
  return h(RichText, {
    key: slug,
    richText: body,
    options: { renderNode: renderNode({ Link, p }) },
  });
};

const Page = ({ page: { title, body, slug } }) =>
  h('div.page', { key: slug }, [
    h(Header, { title, slug }),
    h(Body, { slug, body }),
  ]);

module.exports = Page;
