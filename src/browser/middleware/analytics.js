let initialRequest = true;

module.exports = ({ analyticsRouter, fetch }) => {
  const analyticsPublish = async (type, req, params) => {
    const {
      url,
      headers: { referer }
    } = req;
    const response = await fetch('/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Override-Referer': referer
      },
      body: JSON.stringify({ type, url, ...params })
    });
    return response.json();
  };

  return (req, res, next) => {
    res.on('finish', async () => {
      // as this is also handled server-side, we don't want to track the initial request twice
      if (!initialRequest) {
        req.url = req.originalUrl;
        res.pageview = params => analyticsPublish('pageview', req, params);
        res.event = params => analyticsPublish('event', req, params);
        analyticsRouter(req, res, () => {});
      }
      initialRequest = false;
    });
    next();
  };
};
