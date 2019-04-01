const express = require('express');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');
const enforce = require('express-sslify');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');

const universalApp = require('../universal-app');
const { route: graphqlRoute } = require('../common/graphql');

module.exports = ({ defaultTitle, graphqlSchema, buildDir, nodeEnv }) => {
  const app = express();
  app.disable('x-powered-by');
  if (nodeEnv === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(reactRendererMiddleware({ defaultTitle }));
  app.use(graphqlRoute, graphqlHTTP(graphqlSchema));
  app.use(graphqlClientMiddleware(graphqlSchema));
  return universalApp({ app });
};
