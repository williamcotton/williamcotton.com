// TODO: extendExpress to do this by default for all async/Promises
// https://github.com/alubbe/named-routes/blob/master/router.js#L300

module.exports = function e(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch(err => next(err));
    }
  };
};
