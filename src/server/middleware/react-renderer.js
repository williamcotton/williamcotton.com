const React = require('react');
const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const appLayout = require('../../components/layout');

const styleTag = '<link rel="stylesheet" href="/app.css" />';
const scriptTag = '<script src="/app.js" type="text/javascript" charset="utf-8"></script>';

const htmlTemplate = ({ renderedContent, title, disableJS, queryCache }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  ${styleTag}
  <script type="text/javascript" charset="utf-8">
    window.queryCache = ${JSON.stringify(queryCache)};
  </script>
</head>
<body>
  <div id="app">${renderedContent}</div>${disableJS ? '' : scriptTag}
</body>
</html>
`;

const Link = props => h('a', props);

module.exports = ({ defaultTitle, disableJS }) => (req, res, next) => {
  res.queryCache = {};

  res.renderApp = (content, options = {}) => {
    const contentWithProps = React.cloneElement(content, { Link });
    const renderedContent = renderToString(h(appLayout, { content: contentWithProps, Link }));
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    const { queryCache } = res;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, title, disableJS, queryCache }));
  };

  res.cacheQuery = (route, data) => {
    res.queryCache[route] = data;
  };

  res.renderJSON = json => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(json, null, 2));
  };

  res.Link = Link;

  next();
};
