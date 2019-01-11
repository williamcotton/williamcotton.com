const { renderToString } = require('react-dom/server');

const htmlTemplate = ({ renderedContent, title }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
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
    const renderedContent = renderToString(content);
    const title = options.title || defaultTitle;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlTemplate({ renderedContent, title }));
  };
  res.renderJSON = json => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(json, null, 2));
  };
  next();
};
