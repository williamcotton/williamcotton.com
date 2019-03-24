const express = require('express');
const compression = require('compression');
const reactRendererMiddleware = require('./middleware/react-renderer');
const contentfulMiddleware = require('./middleware/contentful');
const universalApp = require('../universal-app');

module.exports = ({ defaultTitle, contentfulClient, disableJS, publicDir }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactRendererMiddleware({ defaultTitle, disableJS }));
  app.use(contentfulMiddleware({ app, contentfulClient }));
  return universalApp({ app });
};
