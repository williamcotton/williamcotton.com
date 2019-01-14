const h = require('react-hyperscript');
const Article = require('./components/article');

module.exports = ({ app }) => {
  app.get('/', (req, { renderApp }) =>
    renderApp(h('div', 'Hello World'), { title: 'Hello World' })
  );

  app.get(
    '/raw-entries/:entryId',
    async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
      renderJSON(await contentfulClient.getEntry(entryId))
  );

  app.get('/articles/:slug', async ({ getArticle, params: { slug } }, { renderApp }) => {
    try {
      const article = await getArticle({ slug });
      const { title, body } = article;
      renderApp(h(Article, { title, body }), { title });
    } catch (error) {
      let errorMessage = error.message;
      if (error.message === 'ArticleNotFound') {
        errorMessage = "This page isn't here!";
      }
      renderApp(h('div', errorMessage), { statusCode: 404 });
    }
  });

  return app;
};
