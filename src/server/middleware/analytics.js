const format = require('date-fns/format');

module.exports = ({ analyticsRouter, app }) => {
  const analyticsPageview = () => {}; // ({ url, headers, ip, title }) => {};
  const analyticsEvent = () => {}; // ({ url, headers, ip, title, payload }) => {};
  const commonLogFormat = (req, res) => {
    const {
      ip,
      url,
      method,
      httpVersion,
      username,
      headers: { referer, 'user-agent': userAgent },
    } = req;
    const { statusCode } = res;
    const rawRequest = `${method.toUpperCase()} ${url} HTTP/${httpVersion}`;
    const timestamp = format(new Date(), 'ddd, D MMM YYYY HH:mm:ss ZZ');
    console.log(
      `${ip} - ${username || '-'} [${timestamp}] "${rawRequest}" ${
        statusCode || '-'
      } - "${referer || '-'}" "${userAgent}"`
    );
    // ip anonymousId username timestamp "rawRequest" statusCode byteSize "referer" "userAgent"
  };

  app.post('/analytics', (req, res) => {
    const { headers, body, ip } = req;
    const { type, url, statusCode, method, ...params } = body;
    req.url = url;
    res.statusCode = statusCode;
    req.method = method;
    headers.referer = headers['override-referer'];
    delete headers['override-referer'];
    commonLogFormat(req, res);
    switch (type) {
      case 'pageview':
        analyticsPageview({ headers, ip, ...params });
        break;
      case 'event':
        analyticsEvent({ headers, ip, ...params });
        break;
      default:
    }
    res.statusCode = 200;
    res.json({ success: true });
  });

  return (req, res, next) => {
    res.on('finish', () => {
      req.url = req.originalUrl;
      const { url, headers, ip } = req;
      commonLogFormat(req, res);
      res.pageview = (params) =>
        analyticsPageview({ url, headers, ip, ...params });
      res.event = (params) => analyticsEvent({ url, headers, ip, ...params });
      analyticsRouter(req, res, () => {});
    });
    next();
  };
};
