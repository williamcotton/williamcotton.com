const h = require('react-hyperscript');
const { INLINES } = require('@contentful/rich-text-types');
const RichText = require('../vendor/contentful-rich-text');

const renderNode = {
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
    return h('a', { href: url, title, key: `a-${index}` }, text);
  }
};

module.exports = ({ title, body }) =>
  // prettier-ignore
  h('article', [
    h('h2', title), 
    h(RichText, { richText: body, options: { renderNode } }),
  ]);
