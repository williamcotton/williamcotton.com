const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const h = require('react-hyperscript');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
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

const reactServerMiddleware = ({ defaultTitle }) => (req, res, next) => {
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

const contentfulMiddleware = ({ contentfulClient }) => (req, res, next) => {
  req.contentfulClient = contentfulClient;
  res.renderEntry = async entryId => {
    const entry = await contentfulClient.getEntry(entryId);
    const { title, body } = entry.fields;
    res.renderApp(
      h('div', [
        h('h2', title),
        h('p', { dangerouslySetInnerHTML: { __html: documentToHtmlString(body) }})
      ]),
      { title }
    );
  };
  next(); 
};

module.exports = ({ defaultTitle, contentfulClient }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactServerMiddleware({ defaultTitle }));
  app.use(contentfulMiddleware({ contentfulClient }));
  return universalApp({ app });
};
