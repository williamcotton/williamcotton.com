const h = require('react-hyperscript');
const { INLINES } = require('@contentful/rich-text-types');
const RichText = require('../vendor/contentful-rich-text');

const articleUrl = slug => `/articles/${slug}`;

const renderNode = ({ Link }) => ({
  [INLINES.ENTRY_HYPERLINK]: (
    {
      data: {
        target: {
          fields: { title, slug }
        }
      },
      content
    },
    next,
    index
  ) => {
    const url = articleUrl(slug);
    const { value: text } = content[0];
    return h(Link, { href: url, title, key: `a-${index}` }, text);
  }
});

const Header = ({ title, slug }) => h('h2', { key: slug }, title);

const Body = ({ slug, body, Link }) =>
  h(RichText, { key: slug, richText: body, options: { renderNode: renderNode({ Link }) } });

const Page = ({ page: { title, body, slug }, Link }) =>
  h('div.page', { key: slug }, [h(Header, { title, slug }), h(Body, { slug, body, Link })]);

module.exports = Page;
