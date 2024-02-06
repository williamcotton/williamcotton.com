import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import serialize from "form-serialize";

export default ({ app, appLayout }) =>
  (req, res, next) => {
    const onClick = (e) => {
      e.preventDefault();
      function hrefOrParent(target) {
        if (target.href) {
          return target.href;
        }
        if (target.parentElement) {
          return hrefOrParent(target.parentElement);
        }
        return false;
      }
      const href = hrefOrParent(e.currentTarget);
      app.navigate(href);
    };

    const Link = (props) => {
      const mergedProps = { onClick, ...props };
      return React.createElement("a", mergedProps);
    };

    req.Link = Link;

    const Form = (props) => {
      const onSubmit = (e) => {
        e.preventDefault();
        const body = serialize(e.target, { hash: true });
        app.submit(e.target.action, e.target.method, body);
      };
      const mergedProps = { onSubmit, ...props };
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
      const { title, description } = options;
      const statusCode = options.statusCode || 200;
      const layout = options.layout || appLayout;
      const { appContainer } = req.renderDocument({ title, description });
      const root = app.root || createRoot(appContainer);
      app.root = root;
      root.render(React.createElement(layout, { content, req }));
      res.status(statusCode);
      res.send();
    };

    next();
  };
