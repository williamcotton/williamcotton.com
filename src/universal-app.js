const h = require('react-hyperscript');

const FrontPage = require('./components/front-page');
const Article = require('./components/article');

module.exports = ({ app }) => {
  app.get('/', async ({ q }, { renderApp }) => {
    try {
      const { allArticles } = await q('{ allArticles { title, slug, publishedDate, body } }');
      renderApp(h(FrontPage, { allArticles }));
    } catch (error) {
      console.error(error, error.message);
      renderApp(h('div.error', 'Sorry, there was an error!'), { statusCode: 404 });
    }
  });

  app.get(
    '/raw-entries/:entryId',
    async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
      renderJSON(await contentfulClient.getEntry(entryId))
  );

  app.get('/articles/:slug', async ({ q, params: { slug } }, { renderApp }) => {
    try {
      // const article = await getArticle({ slug });
      const { article } = await q(
        'query Article($slug: String!) { article(slug: $slug) { title, slug, publishedDate, body } }',
        { slug }
      );
      const { title } = article;
      renderApp(h(Article, { article }), { title });
    } catch (error) {
      let errorMessage = error.message;
      if (error.message === 'ArticleNotFound') {
        errorMessage = "This page isn't here!";
      }
      renderApp(h('div.error', errorMessage), { statusCode: 404 });
    }
  });

  return app;
};
