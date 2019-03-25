const h = require('react-hyperscript');
const Article = require('./components/article');

// const construction = h('div.construction', [
//   h('img', { src: 'http://www.animatedgif.net/underconstruction/const_e0.gif' })
// ]);

module.exports = ({ app }) => {
  app.get('/', async ({ getAllArticles }, { renderApp }) => {
    try {
      const articles = await getAllArticles();
      renderApp(
        h('div', [articles.map(({ title, body, slug }) => h(Article, { title, body, slug }))])
      );
    } catch (error) {
      let errorMessage = error.message;
      if (error.message === 'ArticleNotFound') {
        errorMessage = "This page isn't here!";
      }
      renderApp(h('div', errorMessage), { statusCode: 404 });
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
      renderApp(h(Article, { title, body, slug }), { title });
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
