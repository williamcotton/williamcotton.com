const h = require('react-hyperscript');
const e = require('./vendor/async-error');

const FrontPage = require('./views/front-page');
const Article = require('./views/article');
const Page = require('./views/page');

const contact = require('./controllers/contact');

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

  app.use('/contact', contact);

  app.get(
    '/:slug',
    e(async ({ q, params: { slug } }, { renderApp }) => {
      const { page } = await q(
        'query Page($slug: String!) { page(slug: $slug) { title, slug, body } }',
        { slug }
      );
      const { title } = page;
      renderApp(h(Page, { page }), { title });
    })
  );

  app.use((error, req, { renderApp }, next) => {
    let errorMessage = error.message;
    let statusCode = 500;
    if (error.message === 'NotFound') {
      errorMessage = "This page isn't here!";
      statusCode = 404;
    }
    renderApp(h('div.error', errorMessage), { statusCode });
    next();
  });

  return app;
};
