import { renderToString } from "react-dom/server";
import React from "react";

const Link = (props) => React.createElement("a", props);

const DefaultLayout = ({ content, req }) => {
  return React.createElement("div", { className: "sitewrapper" }, [
    React.createElement("div", { className: "content" }, [content]),
  ]);
};

export default ({ appLayout }) =>
  (req, res, next) => {
    req.Link = Link;

    const Form = (props) => {
      const mergedProps = { ...props };
      const { children } = mergedProps;
      delete mergedProps.children;
      const formElements = [].concat(children);
      formElements.push(
        React.createElement("input", {
          type: "hidden",
          name: "_csrf",
          value: req.csrf,
        })
      );
      return React.createElement("form", mergedProps, formElements);
    };

    req.Form = Form;

    res.renderComponent = (content, options = {}) => {
      const layout = options.layout || appLayout || DefaultLayout;
      const renderedContent = renderToString(
        React.createElement(layout, { content, req })
      );
      const { title, description } = options;
      const statusCode = options.statusCode || 200;
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(
        req.renderDocument({
          renderedContent,
          title,
          description,
        })
      );
    };

    next();
  };
