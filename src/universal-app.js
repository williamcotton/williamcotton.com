const FrontPage = require('./controllers/front-page');
const Articles = require('./controllers/articles');
const Contact = require('./controllers/contact');
const Pages = require('./controllers/pages');
const demo = require('./controllers/demo');
const error = require('./controllers/error');

module.exports = ({ app }) => {
  app.use('/', new FrontPage().router);

  app.use('/articles', new Articles().router);
  app.use('/contact', new Contact().router);
  app.use('/demo', demo);

  app.use('/', new Pages().router);
  app.use(error);
  return app;
};
