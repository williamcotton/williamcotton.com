const express = require('../vendor/browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const articlesMiddleware = require('./middleware/articles');

const universalApp = require('../universal-app');

module.exports = ({ fetch, document }) => {
  const app = express();
  app.use(reactRendererMiddleware({ app, document }));
  app.use(articlesMiddleware({ fetch }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
