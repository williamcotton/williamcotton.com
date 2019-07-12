let initialRequest = true;

module.exports = ({ analyticsRouter, fetch }) => {
  const analyticsPublish = async (type, req, res, params) => {
    const {
      url,
      method,
      headers: { referer }
    } = req;
    const { statusCode } = res;
    const response = await fetch('/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': req.csrf,
        'Override-Referer': referer
      },
      body: JSON.stringify({ type, url, statusCode, method, ...params })
    });
    return response.json();
  };

  return (req, res, next) => {
    res.on('finish', async () => {
      // as this is also handled server-side, we don't want to track the initial request twice
      if (!initialRequest) {
        req.url = req.originalUrl;
        res.pageview = params => analyticsPublish('pageview', req, res, params);
        res.event = params => analyticsPublish('event', req, res, params);
        analyticsRouter(req, res, () => {
          analyticsPublish('log', req, res, {});
        });
      }
      initialRequest = false;
    });
    next();
  };
};
