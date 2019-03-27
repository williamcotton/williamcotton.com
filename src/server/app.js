const express = require('express');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');

const universalApp = require('../universal-app');

module.exports = ({ defaultTitle, graphqlSchema, disableJS, buildDir }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(reactRendererMiddleware({ defaultTitle, disableJS }));
  app.use('/graphql', graphqlHTTP(graphqlSchema));
  app.use(graphqlClientMiddleware(graphqlSchema));
  return universalApp({ app });
};
