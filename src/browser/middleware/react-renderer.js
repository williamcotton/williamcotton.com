const ReactDOM = require('react-dom');
const h = require('react-hyperscript');
const serialize = require('form-serialize');
const qs = require('qs');

module.exports = ({ app, querySelector, appLayout, clientRequest }) => (
  req,
  res,
  next
) => {
  Object.keys(clientRequest).forEach(key => (req[key] = clientRequest[key])); // eslint-disable-line no-return-assign

  const { defaultTitle } = clientRequest;

  const Link = props => {
    const onClick = e => {
      e.preventDefault();
      app.navigate(e.target.href);
    };
    const mergedProps = Object.assign({ onClick }, props);
    return h('a', mergedProps);
  };

  req.Link = Link;

  // TODO: figure out a way to repopulate the form when browsing back, like how browsers work
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

  res.renderApp = (content, options = {}) => {
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    querySelector('title').innerText = title; // eslint-disable-line no-param-reassign
    ReactDOM.hydrate(
      h(appLayout, { content, req }),
      querySelector('#app'),
      () => {
        res.status(statusCode);
        res.send();
      }
    );
  };

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  next();
};
