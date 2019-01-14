const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const appLayout = require('../../components/layout');

const styleTag = '<link rel="stylesheet" href="/build.css" />';
const scriptTag = '<script src="/build.js" type="text/javascript" charset="utf-8"></script>';

const htmlTemplate = ({ renderedContent, title, disableJS }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  ${styleTag}
</head>
<body>
  <div id="app">${renderedContent}</div>${disableJS ? '' : scriptTag}
</body>
</html>
`;

module.exports = ({ defaultTitle, disableJS }) => (req, res, next) => {
  res.renderApp = (content, options = {}) => {
    const renderedContent = renderToString(h(appLayout, { content }));
    const title = options.title || defaultTitle;
    const statusCode = options.statusCode || 200;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, title, disableJS }));
  };
  res.renderJSON = json => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(json, null, 2));
  };
  next();
};
