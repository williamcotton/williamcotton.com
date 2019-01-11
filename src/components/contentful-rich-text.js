const h = require('react-hyperscript');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS } = require('@contentful/rich-text-types');

const renderImage = ({ url, title }) => `<img src="${url}" title="${title}" />`;

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
    }) => (contentType.includes('image') ? renderImage({ url, title }) : '')
  }
};

module.exports = ({ richText }) =>
  h('p', {
    dangerouslySetInnerHTML: {
      __html: documentToHtmlString(richText, contentfulRenderOptions)
    }
  });
