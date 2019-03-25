const express = require('express');
const compression = require('compression');

const reactRendererMiddleware = require('./middleware/react-renderer');
const articlesMiddleware = require('./middleware/articles');

const universalApp = require('../universal-app');

module.exports = ({ defaultTitle, contentfulClient, disableJS, buildDir }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(reactRendererMiddleware({ defaultTitle, disableJS }));
  app.use(articlesMiddleware({ app, contentfulClient }));
  return universalApp({ app });
};
