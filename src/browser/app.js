const express = require('browser-express');

const expressLinkMiddleware = require('./middleware/express-link');
const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');
// const localExecuteGraphqlClient = require('./middleware/local-execute-graphql-client');
const analyticsMiddleware = require('./middleware/analytics');

const { analyticsRouter } = require('../analytics-events');

const universalApp = require('../universal-app');
const { route, cacheKey } = require('../common/graphql');
const appLayout = require('../views/layout');

module.exports = ({
  fetch
  // graphqlSchema: { schema, rootValue },
}) => {
  const app = express();
  app.use(expressLinkMiddleware());
  app.use(
    reactRendererMiddleware({
      app,
      appLayout
    })
  );
  app.use(
    graphqlClientMiddleware({
      fetch,
      route,
      cacheKey
    })
  );
  // app.use(
  //   localExecuteGraphqlClient({
  //     schema,
  //     rootValue,
  //     fetch,
  //     queryCache,
  //     route,
  //     cacheKey
  //   })
  // );
  app.use(analyticsMiddleware({ analyticsRouter, fetch }));
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
