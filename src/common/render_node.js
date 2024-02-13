import { createElement as h } from "react";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";

const renderNode = ({ Link }) => {
  return ({
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (node.data.target.fields) {
        const {
          title,
          file: { url },
        } = node.data.target.fields;
        return h("img", { src: url, alt: title });
      }
      return false;
    },

    [INLINES.ENTRY_HYPERLINK]: (node, next, index) => {
      const {
        data: {
          target: {
            fields: { title, slug },
            sys: {
              contentType: {
                sys: { id: contentType },
              },
            },
          },
        },
        content,
      } = node;
      const url = "/articles/" + slug;
      const { value: text } = content[0];
      return h(Link, { href: url, title, key: `a-${index}` }, text);
    }
  });
};

export default renderNode;
