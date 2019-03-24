const reactRendererMiddleware = require('./middleware/react-renderer');
const articlesMiddleware = require('./middleware/articles');
const universalApp = require('../universal-app');
const express = require('../vendor/browser-express');

module.exports = ({ fetch }) => {
  const app = express();
  app.use(reactRendererMiddleware());
  app.use(articlesMiddleware({ fetch }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
