const express = require('browser-express');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');
const analyticsMiddleware = require('./middleware/analytics');

const { analyticsRouter } = require('../analytics-events');

const universalApp = require('../universal-app');
const { route, cacheKey } = require('../common/graphql');
const appLayout = require('../views/layout');

module.exports = ({
  fetch,
  queryCache,
  querySelector,
  defaultTitle,
  graphqlSchema: { schema, rootValue },
  clientRequest
}) => {
  const app = express();
  app.use(
    reactRendererMiddleware({
      app,
      querySelector,
      defaultTitle,
      appLayout,
      clientRequest
    })
  );
  app.use(
    graphqlClientMiddleware({
      schema,
      rootValue,
      fetch,
      queryCache,
      route,
      cacheKey
    })
  );
  app.use(analyticsMiddleware({ analyticsRouter, fetch }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
