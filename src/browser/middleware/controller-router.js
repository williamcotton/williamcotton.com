/* eslint import/no-dynamic-require:0 global-require:0 */

require('../../controllers/front-page');
require('../../controllers/articles');
require('../../controllers/contact');
require('../../controllers/errors');
require('../../controllers/pages');
require('../../controllers/demo/reviews');
require('../../controllers/demo/reviews/liked-reviews');

module.exports = ({ app, routes }) => {
  const errors = [];

  routes.forEach(route => {
    const map = {
      root: ({ label }) => {
        const filepath = `../../controllers/${label}`;
        const Controller = require(filepath);
        app.use(
          new Controller({ basePath: `/${label}`, action: 'index' }).router
        );
      },
      namespace: ({ label, children, basePath = '' }) => {
        const path = `${basePath}/${label}`;
        children.forEach(childRoute => {
          map[childRoute.type](Object.assign(childRoute, { basePath: path }));
        });
      },
      resources: ({ label, only, children, basePath = '' }) => {
        const path = `${basePath}/${label}`;
        const filepath = `../../controllers${path}`;
        const Controller = require(filepath);
        app.use(path, new Controller({ only, basePath: path }).router);
        children.forEach(childRoute => {
          map[childRoute.type](Object.assign(childRoute, { basePath: path }));
        });
      },
      match: ({ label: match, controller, action }) => {
        const path = `/`;
        const filepath = `../../controllers/${controller}`;
        const Controller = require(filepath);
        app.use(
          path,
          new Controller({ match, action, basePath: `/${controller}` }).router
        );
      },
      error: error => errors.push(error)
    };

    if (map[route.type]) {
      map[route.type](route);
    }
  });

  const errorControllers = {};

  errors
    .map(({ controller }) => controller)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .forEach(controller => {
      const filepath = `../../controllers/${controller}`;
      const Controller = require(filepath);
      errorControllers[controller] = new Controller();
    });

  app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    res.statusCode = statusCode;
    const { controller, action } = errors.filter(
      e => e.label === statusCode
    )[0];
    if (controller && action) {
      const controllerInstance = errorControllers[controller];
      controllerInstance[action](req, res);
    }
    next();
  });

  return (req, res, next) => {
    next();
  };
};
