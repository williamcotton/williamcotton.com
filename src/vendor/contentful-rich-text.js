const h = require('react-hyperscript');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

const renderImage = ({ url, title }) => `<img src="${url}" title="${title}" />`;
const renderLink = ({ url, title, text }) => `<a href="${url}" title="${title}">${text}</a>`;

const contentfulRenderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: {
          fields: {
            title,
            file: { contentType, url }
          }
        }
      }
    }) => (contentType.includes('image') ? renderImage({ url, title }) : ''),
    [INLINES.ENTRY_HYPERLINK]: ({
      data: {
        target: {
          fields: { title, slug }
        }
      },
      content
    }) => {
      const url = `/articles/${slug}`;
      const { value: text } = content[0];
      return renderLink({ url, title, text });
    }
  }
};

module.exports = ({ richText }) =>
  h('p', {
    dangerouslySetInnerHTML: {
      __html: documentToHtmlString(richText, contentfulRenderOptions)
    }
  });
