const express = require('../vendor/browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');

const universalApp = require('../universal-app');
const { route, cacheKey } = require('../common/graphql');
const appLayout = require('../views/layout');

module.exports = ({ fetch, queryCache, querySelector, defaultTitle }) => {
  const app = express();
  app.use(reactRendererMiddleware({ app, querySelector, defaultTitle, appLayout }));
  app.use(graphqlClientMiddleware({ fetch, queryCache, route, cacheKey }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
