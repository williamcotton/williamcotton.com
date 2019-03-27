const express = require('../vendor/browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');

const universalApp = require('../universal-app');

module.exports = ({ fetch, queryCache, getElementById }) => {
  const app = express();
  app.use(reactRendererMiddleware({ app, getElementById }));
  app.use(graphqlClientMiddleware({ fetch, queryCache }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
