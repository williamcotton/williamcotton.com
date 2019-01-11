const express = require('express');
const compression = require('compression');
const path = require('path');
const reactRendererMiddleware = require('./middleware/react-renderer');
const contentfulMiddleware = require('./middleware/contentful');
const universalApp = require('../universal-app');

const publicDir = path.join(__dirname, '/../../public');

module.exports = ({ defaultTitle, contentfulClient }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactRendererMiddleware({ defaultTitle }));
  app.use(contentfulMiddleware({ contentfulClient }));
  return universalApp({ app });
};
