const h = require('react-hyperscript');
const { INLINES } = require('@contentful/rich-text-types');
const RichText = require('../vendor/contentful-rich-text');

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
    const url = `/articles/${slug}`;
    const { value: text } = content[0];
    return h(Link, { href: url, title, key: `a-${index}` }, text);
  }
});

module.exports = ({ title, body, slug, Link }) =>
  // prettier-ignore
  h('article', { key: slug }, [
    h('h2', { key: slug }, title), 
    h(RichText, { key: slug, richText: body, options: { renderNode: renderNode({ Link }) } }),
  ]);
