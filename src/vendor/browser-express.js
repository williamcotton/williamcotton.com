/* global window */

const BaseRouter = require('router');
const inherits = require('inherits');
const url = require('url');
const qs = require('qs');

const Request = require('./request');
const Response = require('./response');
const supported = require('./supports-push-state');

function Router(options) {
  if (!(this instanceof Router)) {
    return new Router(options);
  }

  // Options is optional
  const opts = options || {};

  // Set the base path
  this.base(opts.base || null);

  // Keep the currently matched location
  this.currentLocation = null;

  // local call stack
  this.stack = [];

  // Local variables
  this.locals = Object.create(null);

  // Call parent constructor
  const r = BaseRouter.call(this, opts);

  // Parse query string
  r.use(function parseQuerystring(req, res, next) {
    req.query = qs.parse(req._parsedUrl.query); // eslint-disable-line no-underscore-dangle
    next();
  });

  // Replace and reload on unhandled request
  this.reloadOnUnhandled = !!opts.reloadOnUnhandled;

  return r;
}

inherits(Router, BaseRouter);

Router.prototype.base = function base(path) {
  if (typeof path === 'undefined') {
    return this.base;
  }
  this.base = path;
  return false;
};

Router.prototype.listen = function listen(options, callback) {
  // Default options
  const opts = options || {};

  // Watch for popstate?
  if (supported && opts.popstate !== false) {
    // Pre-bind the popstate listener so we can properly remove it later
    this.onPopstate = this.onPopstate.bind(this);

    // Bind the event
    window.addEventListener('popstate', this.onPopstate, false);
  }

  // Dispatch at start?
  if (opts.dispatch !== false) {
    this.processRequest(
      {
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      },
      true
    );
  }

  callback();

  return {
    close: this.close
  };
};

Router.prototype.onPopstate = function onPopstate(e) {
  this.processRequest(
    e.state || {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    },
    true
  );
};

Router.prototype.navigate = function navigate(path) {
  this.processRequest(url.parse(path), false);
};

Router.prototype.processRequest = function processRequest(originalUrl, replace) {
  // Normalize the url object
  const modifiedUrl = Object.assign({}, originalUrl);
  modifiedUrl.search = originalUrl.search || '';
  modifiedUrl.hash = originalUrl.hash || '';

  // Strip the base off before routing
  let path = modifiedUrl.pathname;
  if (this.base) {
    path = path.replace(this.base, '');
  }

  // Build next url
  const nextLocation = (path === '' ? '/' : path) + modifiedUrl.search;

  // If processing to the same url, just return
  if (this.currentLocation === nextLocation) {
    return;
  }

  // Keep previous location for if we dont match
  let prevLocation;
  let prevState;
  if (supported) {
    prevLocation = this.currentLocation;
    prevState = window.history.state;
  }

  // Update current location value
  this.currentLocation = nextLocation;

  // Create the request object
  const req = new Request();
  req.app = this;
  req.method = 'GET';
  req.originalUrl = modifiedUrl.pathname + modifiedUrl.search + modifiedUrl.hash;
  req.baseUrl = this.base;
  req.path = path;
  req.url = this.currentLocation + modifiedUrl.hash;

  // Create the response object
  const res = new Response();
  res.app = this;

  this.stack.push([modifiedUrl, null, req.originalUrl, replace]);

  // Run the route matching
  const that = this;
  this(req, res, function done(e) {
    // this is called if no match is found for the route
    if (e) {
      throw e;
    }
    if (that.reloadOnUnhandled) {
      // Replace the state that we had just pushed to maintain the
      // proper back button behavior, then reload the location
      if (supported) {
        window.history.replaceState(prevState, null, prevLocation);
      }
      window.location = req.originalUrl;
    }
  });
};

Router.prototype.close = function close() {
  window.removeEventListener('popstate', this.onPopstate, false);
};

module.exports = Router;
