module.exports = ({ analyticsRouter, app }) => {
  const analyticsPageview = ({ url, headers, ip, title }) => {
    console.log('pageview', { url, headers, ip, title });
  };
  const analyticsEvent = ({ url, headers, ip, title, payload }) => {
    console.log('event', { url, headers, ip, title, payload });
  };

  app.post('/analytics', (req, res) => {
    const { headers, body, ip } = req;
    const { type, ...params } = body;
    headers.referer = headers['override-referer'];
    delete headers['override-referer'];
    switch (type) {
      case 'pageview':
        analyticsPageview({ headers, ip, ...params });
        break;
      case 'event':
        analyticsEvent({ headers, ip, ...params });
        break;
      default:
    }
    res.json({ success: true });
  });

  return (req, res, next) => {
    res.on('finish', () => {
      req.url = req.originalUrl;
      const { url, headers, ip } = req;
      res.pageview = params => analyticsPageview({ url, headers, ip, ...params });
      res.event = params => analyticsEvent({ url, headers, ip, ...params });
      analyticsRouter(req, res, () => {});
    });
    next();
  };
};
