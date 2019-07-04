module.exports = ({ analyticsRouter, app }) => {
  const analyticsPageview = ({ title }) => {
    console.log('pageview', title);
  };
  const analyticsEvent = ({ title, payload }) => {
    console.log('event', title, payload);
  };

  app.post('/analytics', req => {
    const { type, ...params } = req.body;
    switch (type) {
      case 'pageview':
        analyticsPageview(params);
        break;
      case 'event':
        analyticsEvent(params);
        break;
      default:
    }
  });

  return (req, res, next) => {
    res.on('finish', () => {
      req.url = req.originalUrl;
      res.pageview = params => analyticsPageview(params);
      res.event = params => analyticsEvent(params);
      analyticsRouter(req, res, () => {});
    });
    next();
  };
};
