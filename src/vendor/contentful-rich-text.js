const h = require('react-hyperscript');
const { BLOCKS, MARKS, INLINES, helpers } = require('@contentful/rich-text-types');

const defaultInline = (type, node, index) =>
  h('span', { key: `span-${index}` }, `type: ${type} id: ${node.data.target.sys.id}`);

const defaultNodeRenderers = {
  [BLOCKS.PARAGRAPH]: (node, next, index) => h('p', { key: `p-${index}` }, next(node.content)),
  [BLOCKS.HEADING_1]: (node, next, index) => h('h1', { key: `h1-${index}` }, next(node.content)),
  [BLOCKS.HEADING_2]: (node, next, index) => h('h2', { key: `h2-${index}` }, next(node.content)),
  [BLOCKS.HEADING_3]: (node, next, index) => h('h3', { key: `h3-${index}` }, next(node.content)),
  [BLOCKS.HEADING_4]: (node, next, index) => h('h4', { key: `h4-${index}` }, next(node.content)),
  [BLOCKS.HEADING_5]: (node, next, index) => h('h5', { key: `h5-${index}` }, next(node.content)),
  [BLOCKS.HEADING_6]: (node, next, index) => h('h6', { key: `h6-${index}` }, next(node.content)),
  [BLOCKS.EMBEDDED_ENTRY]: (node, next, index) =>
    h('div', { key: `div-${index}` }, next(node.content)),
  [BLOCKS.UL_LIST]: (node, next, index) => h('ul', { key: `ul-${index}` }, next(node.content)),
  [BLOCKS.OL_LIST]: (node, next, index) => h('ol', { key: `ol-${index}` }, next(node.content)),
  [BLOCKS.LIST_ITEM]: (node, next, index) => h('li', { key: `li-${index}` }, next(node.content)),
  [BLOCKS.QUOTE]: (node, next, index) =>
    h('blockquote', { key: `blockquote-${index}` }, next(node.content)),
  [BLOCKS.HR]: () => h('hr'),
  [INLINES.ASSET_HYPERLINK]: (node, next, index) =>
    defaultInline(INLINES.ASSET_HYPERLINK, node, index),
  [INLINES.ENTRY_HYPERLINK]: (node, next, index) =>
    defaultInline(INLINES.ENTRY_HYPERLINK, node, index),
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
  },
  [INLINES.HYPERLINK]: (node, next, index) =>
    h('a', { href: node.data.uri, key: `a-${index}` }, next(node.content))
};

const defaultMarkRenderers = {
  [MARKS.BOLD]: text => h('b', text),
  [MARKS.ITALIC]: text => h('i', text),
  [MARKS.UNDERLINE]: text => h('u', text),
  [MARKS.CODE]: text => h('code', text)
};

let nodeToReact;

const nodeListToReact = (nodes, { renderNode, renderMark }) =>
  nodes.map((node, index) => nodeToReact(node, index, { renderNode, renderMark }));

nodeToReact = (node, index, { renderNode, renderMark }) => {
  if (helpers.isText(node)) {
    const nodeValue = node.value;
    if (node.marks.length > 0) {
      return node.marks.reduce((value, mark) => {
        if (!renderMark[mark.type]) {
          return value;
        }
        return renderMark[mark.type](value);
      }, nodeValue);
    }

    return nodeValue;
  }
  const nextNode = nodes => nodeListToReact(nodes, { renderMark, renderNode });
  if (!node.nodeType || !renderNode[node.nodeType]) {
    return null;
  }
  return renderNode[node.nodeType](node, nextNode, index);
};

const documentToReact = (richTextDocument, options = {}) =>
  nodeListToReact(richTextDocument.content, {
    renderNode: {
      ...defaultNodeRenderers,
      ...options.renderNode
    },
    renderMark: {
      ...defaultMarkRenderers,
      ...options.renderMark
    }
  });

module.exports = ({ richText }) => documentToReact(richText);
