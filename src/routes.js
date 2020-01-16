const drawRoutes = require('./vendor/draw-routes');

module.exports = drawRoutes(({ root, resources, namespace, match, error }) => {
  root('front-page');

  resources('articles', { only: ['show'] });

  resources('contact', { only: ['index', 'create', 'show'] });

  namespace('demo', () =>
    resources('reviews', { only: ['index', 'show'] }, () =>
      resources('liked-reviews', { only: ['create'] })
    )
  );

  match('*', { controller: 'pages', action: 'show' });

  error(404, { controller: 'errors', action: 'notFound' });
  error(500, { controller: 'errors', action: 'serverError' });
});
