const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const qs = require('qs');

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag =
  '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';
const metaViewportTag =
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>';

const htmlTemplate = ({ renderedContent, title, clientRequest }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${metaViewportTag}
  <title>${title}</title>
  ${styleTag}
  <script type="text/javascript" charset="utf-8">
    window.clientRequest = ${JSON.stringify(clientRequest)};
  </script>
</head>
<body>
  <div id="app">${renderedContent}</div>
  ${scriptTag}
</body>
</html>
`;

const Link = props => h('a', props);

module.exports = ({ defaultTitle, appLayout }) => (req, res, next) => {
  req.csrf = req.csrfToken();

  res.clientRequest.csrf = req.csrf;
  res.clientRequest.queryCache = {};
  res.clientRequest.defaultTitle = defaultTitle;

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

  res.renderApp = (content, options = {}) => {
    const renderedContent = renderToString(h(appLayout, { content, req }));
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    const { clientRequest } = res;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(
      htmlTemplate({
        renderedContent,
        title,
        clientRequest
      })
    );
  };

  res.cacheQuery = (key, data) => {
    res.clientRequest.queryCache[key] = data;
  };

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  next();
};
