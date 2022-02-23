const routerFactory = require('router');
const { compile } = require('path-to-regexp');

function e(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch((err) => next(err));
    }
  };
}

const ACTIONS = [
  {
    action: 'index',
    method: 'get',
    path: '/',
  },
  {
    action: 'show',
    method: 'get',
    path: '/:id',
  },
  {
    action: 'create',
    method: 'post',
    path: '/',
  },
  {
    action: 'update',
    method: 'patch',
    path: '/:id',
  },
  {
    action: 'destroy',
    method: 'delete',
    path: '/:id',
  },
];

function initControllerAction({ options, controller, action, method, path }) {
  const actionFunc = controller[action];
  if (
    actionFunc &&
    (options && options.only ? options.only.includes(action) : true) &&
    (options && options.action ? options.action === action : true)
  ) {
    const handler = e(actionFunc.bind(controller));
    const { routePath, filePath } = options;
    const basePathBuilder = compile(routePath + path);
    const pathBuilder = (opts) =>
      basePathBuilder(opts).replace(/^(.+?)\/*?$/, '$1'); // https://stackoverflow.com/a/45737717
    pathBuilder.action = options;
    controller.paths[action] = pathBuilder; // eslint-disable-line no-param-reassign
    controller.router[method](path, (req, res, next) => {
      req.controller = {
        routePath,
        filePath,
        action,
        method,
        path,
        options,
      };
      handler(req, res, next);
    });
  }
}

function initController({ controller, options }) {
  ACTIONS.forEach(({ action, method, path }) =>
    initControllerAction({ controller, options, action, method, path })
  );
}

module.exports = class ActionControllerBase {
  constructor(options) {
    this.router = routerFactory();
    this.options = options;
    this.paths = {};
    initController({ controller: this, options });
  }
};
