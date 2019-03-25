const h = require('react-hyperscript');

const FrontPage = require('./components/front-page');
const Article = require('./components/article');

module.exports = ({ app }) => {
  app.get('/', async ({ getAllArticles }, { renderApp }) => {
    try {
      const articles = await getAllArticles();
      renderApp(h(FrontPage, { articles }));
    } catch (error) {
      console.error(error, error.message);
      renderApp(h('div', 'Sorry, there was an error!'), { statusCode: 404 });
    }
  });

  app.get(
    '/raw-entries/:entryId',
    async ({ contentfulClient, params: { entryId } }, { renderJSON }) =>
      renderJSON(await contentfulClient.getEntry(entryId))
  );

  app.get('/articles/:slug', async ({ getArticle, params: { slug } }, { renderApp }) => {
    try {
      const article = await getArticle({ slug });
      const { title, body } = article;
      renderApp(h(Article, { article }), { title });
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
