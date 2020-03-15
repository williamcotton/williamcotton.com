const analyticsRouter = require('router')();

analyticsRouter.get('/', (req, res) => {
  res.pageview({ title: 'Front Page' });
});

analyticsRouter.get('/about', (req, res) => {
  res.pageview({ title: 'About' });
});

analyticsRouter.get('/bio', (req, res) => {
  res.pageview({ title: 'Bio' });
});

analyticsRouter.get('/contact', (req, res) => {
  res.pageview({ title: 'Contact' });
});

analyticsRouter.get('/articles/:slug', (req, res) => {
  const { title } = req.dataQuery.data.article;
  res.pageview({ title: `Article - ${title}` });
});

analyticsRouter.post('/contact', (req, res) => {
  const payload = req.dataQuery.variables.input;
  console.log({ title: 'Send Email' }, payload);
  res.event({ title: 'Send Email', payload });
});

module.exports = {
  analyticsRouter
};
