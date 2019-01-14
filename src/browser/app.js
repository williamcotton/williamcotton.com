/* global window */
const Nighthawk = require('nighthawk');
const reactRendererMiddleware = require('./middleware/react-renderer');
const universalApp = require('../universal-app');

module.exports = () => {
  const app = Nighthawk();
  app.use(reactRendererMiddleware());
  app.use((req, res, next) => {
    req.getArticle = async ({ slug }) => {
      const response = await window.fetch(`/article/${slug}.json`);
      const articleEntry = response.json();
      return articleEntry;
    };
    next();
  });
  const universalBrowserApp = universalApp({ app });
  return universalBrowserApp;
};
