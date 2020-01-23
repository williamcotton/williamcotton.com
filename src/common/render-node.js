const h = require('react-hyperscript');
const { INLINES } = require('@contentful/rich-text-types');

const renderNode = ({ Link, p }) => ({
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
    const pathBuilder = Object.values(p)
      .map(v => Object.values(v))
      .find(o => {
        const { action } = o[0];
        return action.options && action.options.contentType === contentType;
      })[0];
    const url = pathBuilder({ id: slug });
    const { value: text } = content[0];
    return h(Link, { href: url, title, key: `a-${index}` }, text);
  }
});

module.exports = renderNode;
