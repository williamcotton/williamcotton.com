const frontPage = require('./controllers/front-page');
const articles = require('./controllers/articles');
const contact = require('./controllers/contact');
const pages = require('./controllers/pages');
const error = require('./controllers/error');

module.exports = ({ app }) => {
  app.use('/', frontPage);
  app.use('/articles', articles);
  app.use('/contact', contact);
  app.use('/', pages);
  app.use(error);
  return app;
};
