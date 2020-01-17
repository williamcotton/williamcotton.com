const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const enforce = require('express-sslify');
const cookieSession = require('cookie-session');
const csurf = require('csurf');

const reactRendererMiddleware = require('./middleware/react-renderer');
const graphqlClientMiddleware = require('./middleware/graphql-client');
const analyticsMiddleware = require('./middleware/analytics');
const reactActionViewMiddleware = require('../browser/middleware/react-action-view');
const controllerRouterMiddleware = require('../browser/middleware/controller-router');
const expressLinkMiddleware = require('./middleware/express-link');
const userAuthentication = require('./middleware/user-authentication');
const clientRequestMiddleware = require('./middleware/client-request');

const appLayout = require('../views/layouts/application');
const { route, cacheKey } = require('../common/graphql');
const { analyticsRouter } = require('../analytics-events');
const routes = require('../routes');

const cookieSessionOptions = {
  name: 'session',
  sameSite: 'lax'
};

module.exports = ({
  defaultTitle,
  graphqlSchema: { schema, rootValue, graphiql },
  buildDir,
  nodeEnv,
  sessionSecret,
  githubClientId,
  githubSecret
}) => {
  const app = express();
  app.disable('x-powered-by');
  cookieSessionOptions.keys = [sessionSecret];
  if (nodeEnv === 'production') {
    app.set('trust proxy', 1);
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    cookieSessionOptions.secure = true;
  }
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(clientRequestMiddleware());
  app.use(cookieSession(cookieSessionOptions));
  app.use(userAuthentication({ githubClientId, githubSecret, app }));
  app.use(csurf());
  app.use(expressLinkMiddleware({ defaultTitle }));
  app.use(reactRendererMiddleware({ appLayout }));
  app.use(route, graphqlHTTP({ schema, rootValue, graphiql }));
  app.use(graphqlClientMiddleware({ schema, rootValue, cacheKey }));
  app.use(analyticsMiddleware({ analyticsRouter, app }));
  app.use(reactActionViewMiddleware());
  app.use(controllerRouterMiddleware({ app, routes }));

  return app;
};
