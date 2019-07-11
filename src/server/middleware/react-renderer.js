const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const qs = require('qs');

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag =
  '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';
const metaViewportTag =
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>';

const htmlTemplate = ({ renderedContent, defaultTitle, title, queryCache }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${metaViewportTag}
  <title>${title}</title>
  ${styleTag}
  <script type="text/javascript" charset="utf-8">
    window.queryCache = ${JSON.stringify(queryCache)};
    window.defaultTitle = '${defaultTitle}';
  </script>
</head>
<body>
  <div id="app">${renderedContent}</div>
  ${scriptTag}
</body>
</html>
`;

const Link = props => h('a', props);

const Form = props => h('form', props);

module.exports = ({ defaultTitle, appLayout }) => (req, res, next) => {
  req.globalState = {};

  res.queryCache = {};

  res.renderApp = (content, options = {}) => {
    const { globalState, baseUrl } = req;
    globalState.Link = Link;
    globalState.Form = Form;
    globalState.baseUrl = baseUrl;
    const renderedContent = renderToString(
      h(appLayout, { content, globalState })
    );
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    const { queryCache } = res;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, defaultTitle, title, queryCache }));
  };

  res.cacheQuery = (key, data) => {
    res.queryCache[key] = data;
  };

  res.navigate = (path, query) => {
    const pathname = query ? `${path}?${qs.stringify(query)}` : path;
    res.redirect(pathname);
  };

  res.redirect = res.redirect.bind(res);

  req.Link = Link;

  req.Form = Form;

  next();
};
