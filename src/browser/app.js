const express = require('../vendor/browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const articlesMiddleware = require('./middleware/articles');

const universalApp = require('../universal-app');

module.exports = ({ fetch, fetchCache, getElementById }) => {
  const app = express();
  app.use(reactRendererMiddleware({ app, getElementById, fetch, fetchCache }));
  app.use(articlesMiddleware());
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
