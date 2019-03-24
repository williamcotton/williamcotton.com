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

module.exports = ({ title, body, slug: key, Link }) =>
  // prettier-ignore
  h('article', { key }, [
    h('h2', { key }, title),
    h(RichText, { key, richText: body, options: { renderNode: renderNode({ Link }) } }),
  ]);
