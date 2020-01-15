const ReactDOM = require('react-dom');
const h = require('react-hyperscript');
const serialize = require('form-serialize');

module.exports = ({ app, appLayout }) => (req, res, next) => {
  const Link = props => {
    const onClick = e => {
      e.preventDefault();
      app.navigate(e.target.href);
    };
    const mergedProps = Object.assign({ onClick }, props);
    return h('a', mergedProps);
  };

  req.Link = Link;

  const Form = props => {
    const onSubmit = e => {
      e.preventDefault();
      const body = serialize(e.target, { hash: true });
      app.submit(e.target.action, e.target.method, body);
    };
    const mergedProps = Object.assign({ onSubmit }, props);
    const { children } = mergedProps;
    delete mergedProps.children;
    const formElements = [].concat(children);
    formElements.push(
      h('input', { type: 'hidden', name: '_csrf', value: req.csrf })
    );
    return h('form', mergedProps, formElements);
  };

  req.Form = Form;

  res.renderComponent = (content, options = {}) => {
    const { title } = options;
    const statusCode = options.statusCode || 200;
    const layout = options.layout || appLayout;
    const { appContainer } = req.renderDocument({ title });
    ReactDOM.hydrate(h(layout, { content, req }), appContainer, () => {
      res.status(statusCode);
      res.send();
    });
  };

  next();
};
