const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const enforce = require('express-sslify');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');

const universalApp = require('../universal-app');
const appLayout = require('../views/layout');
const { route, cacheKey } = require('../common/graphql');

module.exports = ({
  defaultTitle,
  graphqlSchema: { schema, rootValue, graphiql },
  buildDir,
  nodeEnv
}) => {
  const app = express();
  app.disable('x-powered-by');
  if (nodeEnv === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(reactRendererMiddleware({ defaultTitle, appLayout }));
  app.use(route, graphqlHTTP({ schema, rootValue, graphiql }));
  app.use(graphqlClientMiddleware({ schema, rootValue, cacheKey }));
  return universalApp({ app });
};
