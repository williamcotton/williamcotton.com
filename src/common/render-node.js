const h = require('react-hyperscript');
const { INLINES } = require('@contentful/rich-text-types');

const { contentTypes } = require('./url');

const renderNode = ({ Link }) => ({
  [INLINES.ENTRY_HYPERLINK]: (node, next, index) => {
    const {
      data: {
        target: {
          fields: { title, slug },
          sys: {
            contentType: {
              sys: { id: contentType }
            }
          }
        }
      },
      content
    } = node;
    const urlBuilder = contentTypes[contentType];
    const url = urlBuilder(slug);
    const { value: text } = content[0];
    return h(Link, { href: url, title, key: `a-${index}` }, text);
  }
});

module.exports = renderNode;
