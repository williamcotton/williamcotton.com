const express = require('express');
const compression = require('compression');
const path = require('path');
const figlet = require('figlet');
const reactRendererMiddleware = require('./middleware/react-renderer');
const contentfulMiddleware = require('./middleware/contentful');
const universalApp = require('../universal-app');

const emailAddress = figlet.textSync('williamcotton@gmail.com', { font: 'small' });

const publicDir = path.join(__dirname, '/../../public');

module.exports = ({ defaultTitle, contentfulClient, disableJS }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactRendererMiddleware({ defaultTitle, disableJS }));
  app.use(contentfulMiddleware({ app, contentfulClient }));
  return universalApp({ app });
};
