const h = require('react-hyperscript');
const e = require('./vendor/async-error');

const FrontPage = require('./components/front-page');
const Article = require('./components/article');

module.exports = ({ app }) => {
  app.get(
    '/',
    e(async ({ q }, { renderApp }) => {
      const { allArticles } = await q('{ allArticles { title, slug, publishedDate, body } }');
      renderApp(h(FrontPage, { allArticles }));
    })
  );

  app.get(
    '/articles/:slug',
    e(async ({ q, params: { slug } }, { renderApp }) => {
      const { article } = await q(
        'query Article($slug: String!) { article(slug: $slug) { title, slug, publishedDate, body } }',
        { slug }
      );
      const { title } = article;
      renderApp(h(Article, { article }), { title });
    })
  );

  app.use((error, req, { renderApp }, next) => {
    let errorMessage = error.message;
    let statusCode = 500;
    if (error.message === 'ArticleNotFound') {
      errorMessage = "This page isn't here!";
      statusCode = 404;
    }
    renderApp(h('div.error', errorMessage), { statusCode });
    next();
  });

  return app;
};
