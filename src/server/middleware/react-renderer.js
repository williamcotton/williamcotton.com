const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');

const appLayout = require('../../components/layout');

const htmlTemplate = ({ renderedContent, title }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="/build.css" />
</head>
<body>
  <div id="app">
    ${renderedContent}
  </div>
</body>
</html>
`;

module.exports = ({ defaultTitle }) => (req, res, next) => {
  res.renderApp = (content, options = {}) => {
    const renderedContent = renderToString(h(appLayout, { content }));
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, title }));
  };
  res.renderJSON = json => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(json, null, 2));
  };
  next();
};
