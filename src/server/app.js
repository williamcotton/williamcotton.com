const express = require('express');
const fs = require('fs');
const compression = require('compression');
const path = require('path');
const reactRendererMiddleware = require('./middleware/react-renderer');
const contentfulMiddleware = require('./middleware/contentful');
const universalApp = require('../universal-app');

const emailAddress = fs.readFileSync(path.join(__dirname, '/../email-address.txt'), 'utf8');

console.log(emailAddress);

const publicDir = path.join(__dirname, '/../../public');

module.exports = ({ defaultTitle, contentfulClient, disableJS }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(publicDir));
  app.use(reactRendererMiddleware({ defaultTitle, disableJS, emailAddress }));
  app.use(contentfulMiddleware({ app, contentfulClient }));
  return universalApp({ app });
};
