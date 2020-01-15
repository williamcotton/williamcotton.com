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

function initControllerAction({ controller, action, method, path }) {
  const actionFunc = controller[action];
  if (actionFunc) {
    const handler = e(actionFunc.bind(controller));
    controller.router[method](path, handler);
  }
}

function initController({ controller }) {
  ACTIONS.forEach(({ action, method, path }) =>
    initControllerAction({ controller, action, method, path })
  );
}

class ActionControllerBase {
  constructor() {
    this.router = routerFactory();
    initController({ controller: this });
  }
}

module.exports = class ApplicationController extends ActionControllerBase {};
