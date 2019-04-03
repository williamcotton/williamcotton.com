const React = require('react');
const ReactDOM = require('react-dom');
const h = require('react-hyperscript');
const serialize = require('form-serialize');

const appLayout = require('../../components/layout');

module.exports = ({ app, getElementById }) => (req, res, next) => {
  const Link = props => {
    const onClick = e => {
      e.preventDefault();
      app.navigate(e.target.href);
    };
    const mergedProps = Object.assign({ onClick }, props);
    return h('a', mergedProps);
  };

  req.Link = Link;

  // TODO: add csrf support to form via hidden input
  const Form = props => {
    const onSubmit = e => {
      e.preventDefault();
      const body = serialize(e.target, { hash: true });
      app.submit(e.target.action, e.target.method, body);
    };
    const mergedProps = Object.assign({ onSubmit }, props);
    return h('form', mergedProps);
  };

  req.Form = Form;

  res.renderApp = (content, options = {}) => {
    const defaultTitle = document.title; // TODO: get defaultTitle from window state in index.js;
    const title = options.title || defaultTitle;
    document.title = title; // TODO: wrap this as a method and pass in from index.js
    const contentWithProps =
      typeof content.type === 'string' ? content : React.cloneElement(content, { Link });
    ReactDOM.hydrate(h(appLayout, { content: contentWithProps, Link }), getElementById('app'));
    res.send();
  };

  next();
};
