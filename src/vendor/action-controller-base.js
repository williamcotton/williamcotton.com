const routerFactory = require('router');

function e(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => next(err));
    }
  };
}

const ACTIONS = [
  {
    action: 'index',
    method: 'get',
    path: '/'
  },
  {
    action: 'show',
    method: 'get',
    path: '/:id'
  },
  {
    action: 'create',
    method: 'post',
    path: '/'
  },
  {
    action: 'update',
    method: 'patch',
    path: '/:id'
  },
  {
    action: 'destroy',
    method: 'delete',
    path: '/:id'
  }
];

function initControllerAction({ options, controller, action, method, path }) {
  const actionFunc = controller[action];
  if (
    actionFunc &&
    (options && options.only ? options.only.includes(action) : true) &&
    (options && options.action ? options.action === action : true)
  ) {
    const handler = e(actionFunc.bind(controller));
    controller.router.use((req, res, next) => {
      req.controller = {
        basePath: options ? options.basePath : '/',
        action
      };
      next();
    });
    controller.router[method](path, handler);
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
    initController({ controller: this, options });
  }
};
