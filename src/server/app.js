const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const path = require('path');
const publicDir = path.join(__dirname, '/../../public');
const universalApp = require('../universal-app');

const htmlTemplate = ({ renderedContent, title }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  
  <body>
    <div id="app">${renderedContent}</div>
  </body>
  </html>
`;

const reactServerMiddleware = ({ title }) => (req, res, next) => {
    res.renderApp = (content, options) => {
      const renderedContent = renderToString(content);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlTemplate({ renderedContent, title }));
    };
    next();
  }

module.exports = ({ defaultTitle }) => {
  const app = express();
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactServerMiddleware({ title: defaultTitle }));
  return universalApp({ app });
};
