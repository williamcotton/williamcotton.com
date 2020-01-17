const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');

const Link = props => h('a', props);

module.exports = ({ appLayout }) => (req, res, next) => {
  req.Link = Link;

  const Form = props => {
    const mergedProps = Object.assign({}, props);
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
    const layout = options.layout || appLayout;
    const renderedContent = renderToString(h(layout, { content, req }));
    const { title, description } = options;
    const statusCode = options.statusCode || 200;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(
      req.renderDocument({
        renderedContent,
        title,
        description
      })
    );
  };

  next();
};
