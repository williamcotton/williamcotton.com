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
  res.renderJSON = json => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(json, null, 2));
  };
  next();
};

const contentfulMiddleware = ({ contentfulClient }) => (req, res, next) => {
  req.contentfulClient = contentfulClient;
  next(); 
};

module.exports = ({ defaultTitle, contentfulClient }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactServerMiddleware({ title: defaultTitle }));
  app.use(contentfulMiddleware({ contentfulClient }));
  return universalApp({ app });
};
