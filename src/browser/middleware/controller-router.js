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
  const paths = {};

  app.use((req, res, next) => {
    req.p = paths;
    next();
  });

  function loadController({
    filePath,
    routePath,
    action,
    only,
    label,
    options
  }) {
    const Controller = require(`../../controllers${filePath}`);
    const controllerInstance = new Controller({
      only,
      filePath,
      action,
      routePath,
      label,
      options
    });
    paths[label] = controllerInstance.paths;
    app.use(routePath, controllerInstance.router);
  }

  let map;

  function nestedChildren({ children, basePath }) {
    if (children) {
      children.forEach(childRoute => {
        map[childRoute.type](Object.assign(childRoute, { basePath }));
      });
    }
  }

  map = {
    root: options => {
      const { label } = options;
      const filePath = `/${label}`;
      const routePath = '';
      const action = 'index';
      loadController({ filePath, routePath, action, label, options });
    },
    namespace: options => {
      const { label, children, basePath = '' } = options;
      const filePath = `${basePath}/${label}`;
      nestedChildren({ children, basePath: filePath });
    },
    resources: options => {
      const { label, only, children, basePath = '' } = options;
      const filePath = `${basePath}/${label}`;
      const routePath = filePath;
      loadController({ filePath, routePath, only, label, options, children });
      nestedChildren({ children, basePath: filePath });
    },
    match: options => {
      const { label: match, controller, action } = options;
      const filePath = `/${controller}`;
      const routePath = '';
      const label = controller;
      loadController({ filePath, routePath, match, action, label, options });
    },
    error: error => errors.push(error)
  };

  routes.forEach(route => {
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
