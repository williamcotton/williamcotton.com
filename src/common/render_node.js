import { createElement as h } from "react";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import highlightjs from "highlight.js";
import webpipe from "./webpipe.js";

highlightjs.registerLanguage('webpipe', webpipe);

export const renderNode = ({ Link }) => {
  return {
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
    },
    
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // https://stein.sh/rendering-code-blocks-with-contentful-typescript-and-vue
      
      const { sys, fields } = node.data.target;

      if (
        sys?.contentType?.sys?.id !== "codeBlock" &&
        sys?.contentType?.sys?.id !== "codeSample"
      ) {
        return undefined;
      }

      const { value: code } = highlightjs.highlight(fields.code, {
        language: fields.lang,
      });

      return h(
        "pre",
        {},
        h("code", { dangerouslySetInnerHTML: { __html: code } })
      );
    },
  };
};

export const renderMark = {};
